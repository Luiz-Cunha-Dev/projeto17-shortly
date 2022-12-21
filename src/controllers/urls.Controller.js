import { connection } from "../database/db.js";
import { nanoid } from 'nanoid'

export async function shortener(req, res){
    const {url} = req.body;
    const {authorization} = req.headers;

    if(!authorization){
        res.sendStatus(401);
        return;
    }

    const token = authorization.replace("Bearer ", "");

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
    const {id} = req.params;

    try{
        const url = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id])

        if(url.rows.length === 0){
            res.sendStatus(404)
            return
        }

        res.send(url.rows[0]).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function redirect(req, res){
    const {shortUrl} = req.params;

    try{
        const url = await connection.query(`SELECT url, "visitCount" FROM urls WHERE "shortUrl" = $1`, [shortUrl])

        if(url.rows.length === 0){
            res.sendStatus(404)
            return
        }

        await connection.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [url.rows[0].visitCount+1, shortUrl])

        res.redirect(url.rows[0].url)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function deleteUrl(req, res){
    const {id} = req.params;
    const {authorization} = req.headers;

    if(!authorization){
        res.sendStatus(401);
        return;
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const section = await connection.query("SELECT * FROM sections WHERE token = $1", [token])

        if(section.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const url = await connection.query(`SELECT "userId" FROM urls WHERE id = $1`, [id])

        if(url.rows.length === 0){
            res.sendStatus(404)
            return
        }

        if(section.rows[0].userId !== url.rows[0].userId){
            res.sendStatus(401)
            return
        }

        await connection.query("DELETE FROM urls WHERE id = $1", [id])

        res.sendStatus(204)
        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}