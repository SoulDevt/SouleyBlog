import {db} from '../db.js'

export const addPost = (req, res) => {
    res.json("it works from controller");
}

export const getPosts = (req, res) => {
    const q = req.query.cat ?  "SELECT * from posts where cat=?" : "SELECT * from posts"
    //import db and launch request
    db.query(q, [req.query.cat], (err,data) => {
        if(err) return res.send(err)
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg ,`cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err,data) => {
        if(err) return res.send(err)
        return res.status(200).json(data[0]);
    })
}

export const deletePost = (req, res) => {
    res.json("it works from controller");
}

export const updatePost = (req, res) => {
    res.json("it works from controller");
}
