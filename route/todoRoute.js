const express = require('express');
const router = express.Router();
const con = require("../connection");

// these are the controllers
// we will create all of them in the future
const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controller/todoController");


// to get all the todos
router.get("/todos/", getAllTodos);

// to get a single todo
router.get("/todo/:id/", getTodo);

// to create a todo
router.post("/todo/create/", createTodo);

// to update the todo
router.put("/todo/:id/", updateTodo);

// to delete the todo
router.delete("/todo/:id/", deleteTodo);

// // we will export the router to import it in the index.js
// module.exports = router;




router.get("/", (req , res)=>{
 
    con.query("SELECT * from todo" , (err , rows , fields) =>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

module.exports = router;