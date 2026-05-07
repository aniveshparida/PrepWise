"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import AuthFormFields from "@/components/ui/FormField"
import Link from "next/link"

// Unified form schema – `name` is optional so it can be toggled per form type
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type AuthFormProps = {
  type: "sign-in" | "sign-up"
}

export default function AuthForm({ type }: AuthFormProps) {
  const isSignUp = type === "sign-up"
  const isSignIn = type === "sign-in"
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: FormValues) {
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Prepwise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 w-full form">
            <h2 className="text-2xl font-bold">
              {isSignUp ? "Create an account" : "Sign in"}
            </h2>

            <AuthFormFields isSignUp={isSignUp} />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link className="text-user-primary ml-1 font-bold" href={!isSignIn ? "/sign-in" : "/sign-up"}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  )
}