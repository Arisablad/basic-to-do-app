"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import Todo from "@/app/models/TodosModels";
import EditToDoModal from "@/components/EditToDoModal";


export const dynamic = 'force-dynamic'

export type Todo = {
    _id?: string,
    title: string,
    description: string,
    done: boolean,
}




export default function Home() {
    const [allTodos, setAllTodos] = useState<[] | Todo[]>([])
    const [openModal, setOpenModal] = useState(false)
    const { toast } = useToast()


    useEffect( ()=>{
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/todos")
                const data = await response.json()
                setAllTodos(data.todos)
            } catch (e) {
                throw new Error("Something went wrong")
            }
        }
        void fetchData()
    }, [])

    const markTodoAsCompleted = async (todo : Todo) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/done/${todo._id}`, {
                method: "PATCH",
                body: JSON.stringify({done: !todo.done}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            setAllTodos(prevState => prevState.map(prevToDo => prevToDo._id === todo._id ? {...prevToDo, done: !prevToDo.done} : prevToDo))
            toast({
                title: "Success",
                description: `${todo.done? "Sucessfully mark as undone" : "Sucessfully mark as done"} todo`,
                variant: "default",
                duration: 2000
            })
        }
        catch (error) {
            toast({
                title: "Error",
                description: "In mark todo as done/undone",
                variant: "destructive",
                duration: 2000
            })
        }
    }
        const deleteTodo = async (id: string | undefined) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            setAllTodos(
                prevTodos => prevTodos.filter(todo => todo._id !== id)
            )
            toast({
                title: "Success",
                description: "Sucessfully deleted todo",
                variant: "default",
                duration: 2000
            })
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Error in removing todo",
                variant: "destructive",
                duration: 2000
            })
        }
    }

    const setEditTodo = (id: string | undefined, newTodo: Todo) => {
        setAllTodos(
    prevTodos => prevTodos.map(todo => todo._id === id ? newTodo : todo)
        )
    }


  return (
    <MaxWidthWrapper>
      <div className={"w-full mt-12 flex flex-col max-h-[700px] p-4 overflow-y-auto gap-2 p-4 rounded-2xl bg-secondary"}>
          {allTodos && allTodos.length > 0 ? allTodos.map(todo => (
              <div key={todo._id} className={cn("p-4 bg-primary rounded-md text-primary-foreground dark:text-secondary-foreground", {
                  "opacity-50 bg-green-400": todo.done
              })}>
                  <div className={"flex flex-col gap-4 sm:justify-between sm:flex-row"}>
                          <div className={"flex flex-col max-w-[320px] max-h-full break-words "}>
                            <h1>{todo.title}</h1>
                            <p>{todo.description}</p>
                          </div>
                      <div className={"flex flex-col gap-2 min-w-[160px]"}>
                          <Button className={"bg-secondary text-foreground hover:bg-green-600 transition-all duration-300 ease-in-out"} onClick={() => markTodoAsCompleted(todo)}>{!todo.done ? "Mark as completed" : "Mark as uncompleted"}</Button>
                          <Button variant={"destructive"} className={"hover:bg-red-500/80 transition-all duration-300"}  onClick={() => deleteTodo(todo._id)}>Delete-todo</Button>
                          <Dialog open={openModal} onOpenChange={setOpenModal}>
                              <DialogTrigger>
                                  <Button variant={"default"} className={"bg-secondary text-foreground w-full hover:bg-orange-500 transition-all duration-300"}>Edit</Button>
                              </DialogTrigger>
                               <EditToDoModal todo={todo} setTodos={setEditTodo} setOpenModal={setOpenModal}/>
                          </Dialog>
                      </div>
                  </div>
                 <div>
                 </div>
              </div>
          )) : (
              <p>No todos found</p>
          )}
      </div>
    </MaxWidthWrapper>
  )
}
