import {db} from '../db.js'
import bcrypt from 'bcrypt'
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
    
}

export const logout = (req,res) => {
    
}
