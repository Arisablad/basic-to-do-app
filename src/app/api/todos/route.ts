import {NextRequest, NextResponse} from "next/server";
import dbConnection from "@/lib/MongoDbConnnection";
import Todo from "@/app/models/TodosModels";


export async function GET(request: NextRequest,) {
 try{
    const db = await dbConnection();
    const todos = await Todo.find({});
    if (!todos) {
        return NextResponse.json({error: "No todos found"});
    }
    return NextResponse.json({todos: todos});
 }
 catch(e){
    return NextResponse.json(e)
 }
}


