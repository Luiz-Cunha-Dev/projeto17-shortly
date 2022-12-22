import { connection } from "../database/db.js";

export function getSectionByToken(token){
    return connection.query("SELECT * FROM sections WHERE token = $1", [token])
}

export function insertNewShortUrl(userId, shortUrl, url){
    return connection.query(`INSERT INTO urls ("userId", "shortUrl", url, "visitCount") VALUES ($1, $2, $3, $4)`, [userId, shortUrl, url, 0])
}

export function getUrlById(id){
    return connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id])
}

export function getUrlByShortUrl(shortUrl){
    return connection.query(`SELECT url, "visitCount" FROM urls WHERE "shortUrl" = $1`, [shortUrl])
}

export function updateVisitCountFromUrls(newValue, shortUrl){
    return connection.query(`UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, [newValue, shortUrl])
}

export function getUserIdFromUrls(id){
    return connection.query(`SELECT "userId" FROM urls WHERE id = $1`, [id])
}

export function deleteUrlById(id){
    return connection.query("DELETE FROM urls WHERE id = $1", [id])
}