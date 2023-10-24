import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, maxLength: 90 },
    done: { type: Boolean, default: false },
})

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema)