import {db} from '../db.js'

export const addPost = (req, res) => {
    res.json("it works from controller");
}

export const getPosts = (req, res) => {
    const q = req.params.cat ?  "SELECT * from posts where cat = ?" : "SELECT * from posts"

    //import db and launch request
    db.query(q, [req.params.cat], (err,data) => {
        if(err) return res.send(err)
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    res.json("it works from controller");
}

export const deletePost = (req, res) => {
    res.json("it works from controller");
}

export const updatePost = (req, res) => {
    res.json("it works from controller");
}
