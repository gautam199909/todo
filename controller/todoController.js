
const con = require("../connection");
const redis = require("redis");


const redisPort = 6379;
const client = redis.createClient(redisPort);


exports.updateTodo = (req, res) => {

    const setData = JSON.stringify(req.body);
   
let sql;
if(req.body.title && req.body.description){
    sql = `UPDATE todo 
     SET
     title = "${req.body.title}"
     description = "${req.body.description}"
    where id=${req.params.id};`;
}
else if(req.body.title){
    sql = `UPDATE todo 
    SET
    title = "${req.body.title}"
   where id= ${req.params.id};`;
}
else if(req.body.description){
    sql = `UPDATE todo 
    SET
    description = "${req.body.description}"
   where id=${req.params.id};`;
}
else{
    res.status(200).send("succesful");
}

console.log(sql);
    con.query(sql , (err , rows , fields) =>{
        if(!err){
            res.status(200).send("row changed");
        }
        else{
            res.status(404).send("QUERY FAILED");
        }
    });
   

};



exports.deleteTodo = (req, res) => {
    console.log(req.param.id);
    let sql = `DELETE  from todo where id=${req.params.id}`;
    con.query(sql , (err , rows , fields) =>{
        if(!err){
            res.status(200).send("ROW DELETED");
        }
        else{
            res.status(404).send("QUERY FAILED");
        }
    });
};


exports.getTodo = async (req, res) => {

   
    let sql = `SELECT * from todo where id=${req.params.id}`;
    con.query(sql , (err , rows , fields) =>{

        if(!err){
            console.log("i am here");
            client.setEx("lucky", 3600 , "gautam");
            res.status(200).send(rows);
        }
        else{
            res.status(404).send("Failed!");
        }
    });


};

exports.getAllTodos = (req, res) => {
  // simply use .find() method and it will return all the todos

  con.query("SELECT * from todo" , (err , rows , fields) =>{
    if(!err){
        res.status(200).send(rows);
    }
    else{
        res.status(404).send("Failed!");
    }
})
};

exports.createTodo = (req, res) => {

    // create a todo instance by passing 'task' field from 'req.body'
    let sql = `INSERT INTO todo(title, description) VALUES ("${req.body.title}", "${req.body.description}")`;
    con.query(sql,( err , rows , fields) =>{
        if(!err){
            res.status(200).send('Successfully added');

        }
        else{
            console.log(err);
        }
    });
    
    
  };