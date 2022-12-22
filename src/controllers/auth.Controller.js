import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getUserByEmail, insertNewUser, insertNewSection } from "../repository/auth.repository.js";

export async function signup(req, res){
    const {name, email, password} = req.body;

    try{
        const registeredUser = await getUserByEmail(email)

        if(registeredUser.rows.length !== 0){
            res.sendStatus(409)
            return
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await insertNewUser(name, email, encryptedPassword)

        res.sendStatus(201)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function signin(req, res){
    const {email, password} = req.body;

    try{
        const user = await getUserByEmail(email)

        if(user.rows.length === 0 || !bcrypt.compareSync(password, user.rows[0].password)){
            res.sendStatus(401)
            return
        }

        const token = uuid();

        await insertNewSection(user.rows[0].id, token)
    
        res.send(token).status(200);
        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}