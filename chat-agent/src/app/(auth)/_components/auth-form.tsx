'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field"

import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

interface AuthFormProps extends React.ComponentProps<"div"> {
    IS_SIGNUP?: boolean;
    className?: string;
}

export function AuthForm({
    className,
    IS_SIGNUP = false,
    ...props
}: AuthFormProps) {



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

    async function signInWithSocial(provider: "github" | "google") {
        console.log(`Sign in with ${provider}`);
        await authClient.signIn.social({
            provider,
            callbackURL: "/",

        })

    }



    return (
        <Form {...form}>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 font-mono">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Link
                                href="#"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <span className="sr-only">Agent AI.</span>
                            </Link>
                            <h1 className="text-xl font-bold">{IS_SIGNUP ? "Welcome to Agent AI." : "Welcome back to Agent AI."}</h1>
                            <FieldDescription>
                                { IS_SIGNUP ? 'Already have an account?' : "Don't have an account?"} <Link href={IS_SIGNUP ? "/sign-in" : "/sign-up"}>{IS_SIGNUP ? "Sign in" : "Sign up"}</Link>
                            </FieldDescription>
                        </div>
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
                                        <Input type="password" placeholder="***********" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit">{IS_SIGNUP ? "Create Account" : "Sign In"}</Button>
                        
                        <FieldSeparator>Or</FieldSeparator>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Button onClick={() => signInWithSocial('github')} variant="outline" type="button">
                                <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} className="mr-2" />
                               GitHub
                            </Button>
                            <Button onClick={() => signInWithSocial('google')} variant="outline" type="button">
                                <Image src="/icons/google.svg" alt="Google" width={20} height={20} className="mr-2" />
                                Google
                            </Button>
                        </div>
                    </div>
                </form>
                <FieldDescription className="px-6 font-sans text-center">
                    By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                    and <Link href="#">Privacy Policy</Link>.
                </FieldDescription>
            </div>
        </Form>
    )
}
