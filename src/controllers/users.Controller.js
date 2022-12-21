import { connection } from "../database/db.js";

export async function getUserData(req, res){
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

        const user = await connection.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" FROM users JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id`, [section.rows[0].userId])

        if(user.rows.length === 0){
            res.sendStatus(404)
            return
        }

        const urls = await connection.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`, [user.rows[0].id])

        user.rows[0].shortenedUrls = urls.rows
        
        res.send(user.rows[0]).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}


