import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const register = (req,res) => {
    //check if the user exists already
    const q = 'SELECT * FROM users WHERE username = ? or email = ?'
    db.query(q,[req.body.name,req.body.email], (err,data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists")

        //else insert the user
        const q = 'INSERT INTO users (username, email, password) VALUES (?)'
        //encrypt password

        const saltRounds = 10;
        const myPlaintextPassword = req.body.password

        // const salt = bcrypt.genSaltSync(10)
        // const hash = bcrypt.hashSync(req.body.password, salt)

        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            const values = [
                req.body.username,
                req.body.email,
                hash
            ]
            db.query(q, [values], (err,data) => {
                if (err) return res.json(err)
                return res.status(200).json("User has been created")
            })
        });
    })

}

export const login = (req,res) => {
    //check if the user exists already
    const q = 'SELECT * FROM users WHERE username = ?'
    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("User not found")


        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        
        //configure token JWT
        const token = jwt.sign({id: data[0].id }, "jwtkey")
        const {password, ...other} = data[0]
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(other)
    })
    
}

export const logout = (req,res) => {
    res.clearCookie('access_token', {
        sameSite: "none",
        secure: true
    }).status(200).json("user has been logged out")
}
