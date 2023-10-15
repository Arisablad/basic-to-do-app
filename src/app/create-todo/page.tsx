"use client"
import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    title: z.string().min(3, " Title must have at least 3 characters").max(20, " Title must have at most 20 characters"),
    description: z.string().min(3, " Description must have at least 3 characters").max(90, " Description must have at most 90 characters"),
    done: z.boolean().optional()
})

function Page() {
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            done: false
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
         try {
             const sentDataToServer = await fetch("http://localhost:3000/api/create", {
                 method: "POST",
                 body: JSON.stringify(data)
             })
             const sentData = await sentDataToServer.json()
             if (!sentData.error) {
                 form.reset()
             }else{
                 toast({
                     title: "Error",
                     description: sentData.error,
                     variant: "destructive",
                     duration: 2000
                 })
             }
             toast({
                 title: "Success",
                 description: "Sucessfully created todo",
                 variant: "default",
                 duration: 2000
             })
         }
         catch (e: any) {
             toast({
                 title: "Error",
                 description: "Something went wrong, please try again" + e.message,
                 variant: "destructive",
                 duration: 2000
             })
         }
    }

    return (
        <MaxWidthWrapper>
            <div className={"w-full flex flex-col p-6"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-20 flex flex-col">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Obowiązki" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Title of your todo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Description </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Obrać ziemniaki" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Description of your todo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={ form.formState.isSubmitting }>Submit</Button>
                    </form>
                </Form>
            </div>
        </MaxWidthWrapper>
    );
}

export default Page;