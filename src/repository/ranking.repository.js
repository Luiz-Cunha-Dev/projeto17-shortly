import { connection } from "../database/db.js";

export function getRankingList(){
    return connection.query(`SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" LIMIT 10`)
}