"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export default function ProfileForm() {

    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        await authClient.signUp.email({
            email: values.email, // user email address
            password: values.password, // user password -> min 8 characters by default
            name: values.name, // user display name
            // User image URL (optional)
            callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                toast("Creating your account...");
            },
            onSuccess: (ctx) => {
                toast.success("Account created successfully!");
                router.push("/");
            },
            onError: (ctx) => {
                toast.error("Opps!", { description: ctx.error.message });
            },
        });
    }

    async function signInWithGitHub() {
        console.log("Sign in with GitHub");
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
            
        })

    }





    return (
        <Form {...form}>

            <div className=" py-20 max-w-md mx-auto">
                <h1 className="text-2xl font-sans font-semibold my-2">Create an Account</h1>


                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 font-mono">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Joe do" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="joedo@example.com" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="***********" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full my-2" type="submit">Submit</Button>

                    <Separator className="my-4 w-[50%]" />

                    <Button type="button" onClick={signInWithGitHub} variant="outline" className="w-full cursor-pointer">
                        <Github className="mr-2" />
                        Continue with GitHub
                    </Button>

                </form>

            </div>
        </Form>
    )
}