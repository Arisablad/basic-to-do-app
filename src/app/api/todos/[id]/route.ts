import {NextRequest, NextResponse} from "next/server";
import dbConnection from "@/lib/MongoDbConnnection";
import Todo from "@/app/models/TodosModels";


export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
    try{
        await dbConnection();
        const body = await request.json();
        const editedTodo = await Todo.findOneAndUpdate(
            {_id: params.id},
            body,
            { new: true },
        )
        if (!editedTodo) {
            return NextResponse.json({error: "No todos found"});
        }
        return NextResponse.json({todos: editedTodo});
    }
    catch(e){
        return NextResponse.json(e)
    }
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    try{
        await dbConnection();
        const deletedTodo = await Todo.findOneAndDelete({_id: params.id});
        if (!deletedTodo) {
            return NextResponse.json({error: "No todos found"});
        }
        return NextResponse.json({todos: deletedTodo});
    }
    catch(e){
        return NextResponse.json(e)
    }
}