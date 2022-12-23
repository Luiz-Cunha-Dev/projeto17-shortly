import { connection } from "../database/db.js";

export function getSectionByToken(token){
    return connection.query("SELECT * FROM sections WHERE token = $1", [token])
}

export function getUserById(id){
    return connection.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id`, [id])
}

export function getUrlsByUserId(userId){
    return connection.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`, [userId])
}