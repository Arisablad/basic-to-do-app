"use client"
import React from 'react';
import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Todo} from "@/app/page";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
    title: z.string().min(3, " Title must have at least 3 characters").max(20, " Title must have at most 20 characters"),
    description: z.string().min(3, " Description must have at least 3 characters").max(90, " Description must have at most 90 characters"),
})

function EditToDoModal({todo, setTodos, setOpenModal}: {todo: Todo, setTodos: (id:string | undefined, todo: Todo) => void, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>}) {

    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: todo.title,
            description: todo.description,
        },
    })

    const onEdit = async (data: z.infer<typeof formSchema>) => {
        try{
            const response = await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok){
                throw new Error("Something went wrong")
            }
            const editedTodo = await response.json()
            setTodos(editedTodo.todos._id, editedTodo.todos)
            setOpenModal(false)
            toast({
                title: "Success",
                description: "Sucessfully edited todo",
                variant: "default",
                duration: 2000
            })

        } catch (e:any){
            toast({
                title: "Error",
                description: "Something went wrong, please try again" + e.message,
                variant: "destructive",
                duration: 2000
            })
        }

    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit your todo here?</DialogTitle>
                <DialogDescription>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onEdit)} className="space-y-8 mt-20 flex flex-col">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Obowiązki" {...field} value={field.value} />
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
                                            <Input placeholder="Obrać ziemniaki" {...field} value={field.value} />
                                        </FormControl>
                                        <FormDescription>
                                            Description of your todo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Edit</Button>
                        </form>
                    </Form>

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}

export default EditToDoModal;