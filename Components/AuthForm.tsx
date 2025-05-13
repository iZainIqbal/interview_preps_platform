"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod"

import { Button } from "@/Components/ui/button";
import { Form} from "@/Components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
    return z.object({
      name:  type === "sign-up" ? z.string().min(3, { message: "Name is required" }) : z.string().optional(), 
      email : z.string().email(),
      password : z.string().min(8, { message: "Password is required" }),
    });
}

const AuthForm = ({type} : {type : FormType} ) => {
  const router = useRouter();
  const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
       try {
          if (type === "sign-up") {
            
            toast.success(`Sign Up Successful ` + values)
            router.push('/sign-in')
          } else if (type === "sign-in") {
            
            toast.success("Sign In Successful" + values)
            router.push('/')
          } 

        } catch (error) {
          console.log(error)
          toast.error(`Error in form submission : ${error}`)
        }
    }

    const isSignIn = type === "sign-in"
  return (
    <div className="card-border lg:min-w-[566px] ">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt='logo' height={32} width={38} ></Image>
                <h2 className="text-primary-100">InterviewPrep's</h2>
            </div>
            <h3>Practice Job interviews with AI</h3>
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && <FormField control={form.control}
        name = "name" label="Name" placeholder="Your Name" />}
        <FormField control={form.control}
        name = "email" label="Email" placeholder="Your Email Address" type="email" />
        <FormField control={form.control}
        name = "password" label="Password" placeholder="Enter your Password" type="password"/>
        <Button type="submit" className="btn">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">{isSignIn ? 'No Account Yet ': 'Already have an Account'}
        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
            {!isSignIn ? 'Sign In' : 'Sign Up'}
        </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm