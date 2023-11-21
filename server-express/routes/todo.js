const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = "";

//check if auth header present
router.use(function (req, res, next) {
    if (req.header("Authorization")) {
		try {
			req.payload = jwt.verify(req.header("Authorization"), privateKey, {
				algorithms: ["RS256"],
			}); 
            next();
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	} else {
		return res.status(401).json({ error: "Authorization header missing." });
	}
});

router.post("/", async function (req, res) {
	const todo = new Todo({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
	    author: req.payload.id,
        complete: req.body.complete,
        dateCreated: req.body.dateCreated,
        dateCompleted: req.body.dateCompleted,
    });
	await todo
		.save()
		.then((savedTodo) => {
			return res.status(201).json({
				_id: savedTodo._id,
                title: savedTodo.title,
                description: savedTodo.description,
                author: savedTodo.author,
                complete: savedTodo.complete,
                dateCreated: savedTodo.dateCreated,
                dateCompleted: savedTodo.dateCompleted,
			});
		})
    .catch((error) => {
        return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {      
    Todo.find()
        .where("author")
        .equals(req.payload.id)
        .then((todos) => {
            return res.status(200).json(todos);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.patch("/:_id", async function (req, res) {
    console.log(req.params._id);
    
    Todo.findByIdAndUpdate( 
        req.params._id, 
        {complete: req.body.complete, dateCompleted: req.body.dateCompleted})
        .then((todo) => {
            return res.status(200).json({
                _id: todo._id,
                title: todo.title,
                description: todo.description,
                author: todo.author,
                complete: todo.complete,
                dateCreated: todo.dateCreated,
                dateCompleted: todo.dateCompleted,
			});
		})
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});   

router.delete("/:_id", async function (req, res, next) {
    Todo.findByIdAndDelete(req.params._id)
        .then((todo) => {
            if (todo) {
                return res.status(200).json({
                    title: todo.title,
                    description: todo.description,
                    author: todo.author,
                    complete: todo.complete,
                    dateCreated: todo.dateCreated,
                    dateCompleted: todo.dateCompleted
                });
            }
        }).catch((error) => { error.message });
});

module.exports = router;