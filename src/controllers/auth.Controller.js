import { connection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signup(req, res){
    const {name, email, password} = req.body;

    try{
        const registeredUser = await connection.query("SELECT * FROM users WHERE email = $1", [email])

        if(registeredUser.rows.length !== 0){
            res.sendStatus(409)
            return
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, encryptedPassword])

        res.sendStatus(201)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function signin(req, res){

    try{

        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}