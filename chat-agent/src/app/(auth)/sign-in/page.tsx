import { AuthForm } from "@/app/(auth)/_components/auth-form";

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm IS_SIGNUP={false} />
      </div>
    </div>
  )
}
