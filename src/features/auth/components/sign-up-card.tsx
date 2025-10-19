"use client"

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormField,
} from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "@/features/auth/api/use-register";


export const SignUpCard = () => {

    const { mutate, isPending } = useRegister();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex flex-col items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy policy</span>
                    </Link> {" "}
                    and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link> {" "}
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            placeholder="Enter email asress"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={false} type="submit" size={"lg"} className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login with google
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5" />
                    Login with github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700">&nbsp;Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}