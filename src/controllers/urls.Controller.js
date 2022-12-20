import { connection } from "../database/db.js";
import { nanoid } from 'nanoid'

export async function shortener(req, res){
    const {url} = req.body;
    const {authorization} = req.headers;
    const token = authorization.replace("Bearer ", "");

    if(!token){
        res.sendStatus(401);
        return;
    }

    try{
        const section = await connection.query("SELECT * FROM sections WHERE token = $1", [token])

        if(section.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const shortUrl = nanoid(8);

        await connection.query(`INSERT INTO urls ("userId", "shortUrl", url, "visitCount") VALUES ($1, $2, $3, $4)`, [section.rows[0].userId, shortUrl, url, 0])


        res.send({shortUrl}).status(201)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function searchUrl(req, res){

    try{


    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function redirect(req, res){

    try{


    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function deleteUrl(req, res){

    try{

        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}