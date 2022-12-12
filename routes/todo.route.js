

const express = require("express");
const { TodoModel } = require("../models/Todo.model.schema");



const todosRouter = express.Router();


todosRouter.get("/", async (req, res) => {
    const notes = await TodoModel.find()
    res.send(notes)
})

todosRouter.post("/create", async (req, res) => {
    const payload = req.body
    //get token from header
    //verify token using jwt
    try{
        const new_todo = new TodoModel(payload)
        await new_todo.save()
        res.send({"msg" : "Note created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

todosRouter.patch("/update/:noteID", async (req, res) => {
        const noteID = req.params.noteID
        const userID = req.body.userID
        const note = await TodoModel.findOne({_id:noteID})
        if(userID !== note.userID){
            res.send("Not authorised")
        }
        else{
            await TodoModel.findByIdAndUpdate({_id : noteID},payload)
            res.send({"msg" : "Note updated successfully"})
        }
})

todosRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await TodoModel.findOne({_id:noteID})
    if(userID !== note.userID){
        res.send("Not authorised")
    }
    else{
        await TodoModel.findByIdAndDelete({_id : noteID})
        res.send({"msg" : "Note deleted successfully"})
    }
})


module.exports = {todosRouter}


