'use client'
import { Button } from "@/components/ui/button"
import { authClient, useSession } from "@/lib/auth-client"
import Link from "next/link"

const page = () => {

  const {data} = useSession()
  return (
    <div className='font-mono p-20'>
      <h1 className="text-2xl font-bold">Welcome to the Chat Agent</h1>
      <div className="my-4">{data ? 

      <div >
        <p>Hello, "{data.user.name}"</p>
        <p>You are logged in as "{data.user.email}" </p>
      </div>
      
      : "You are not logged in."}</div>

      {/* sign out button */}
      {data ? <Button
        onClick={async () => {
          await authClient.signOut()
        }}
       variant={'destructive'}
      >
        Sign Out
      </Button>
      : <Link href="/sign-up">
        <Button>
          Sign Up
        </Button>
      </Link>
      }
      <div className="flex gap-4 my-4">
        <Button asChild>
          <Link href="/chats-rh">Go to Chats by Route Handlers</Link>
        </Button>
        <Button asChild>
          <Link href="/chats-sa">Go to Chats by Server Actions</Link>
        </Button>
      </div>
    </div>
  )
}

export default page
