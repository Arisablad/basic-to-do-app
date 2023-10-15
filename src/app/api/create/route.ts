import {NextRequest, NextResponse} from "next/server";
import Todo from "@/app/models/TodosModels";
import dbConnection from "@/lib/MongoDbConnnection";

export async function POST( request: NextRequest, response: NextResponse) {
    void await dbConnection();
    try{
        const body = await request.json()
        const {title, description, done} = body
        if (!title || !description || done === "" || done === undefined) {
            return NextResponse.json({error: "Missing required fields"})
        }
        const todos = await Todo.create({title, description, done})
        return NextResponse.json(todos)
    }
    catch(e){
        console.log("error POST TODOS", e)
        return NextResponse.json(e)
    }
}