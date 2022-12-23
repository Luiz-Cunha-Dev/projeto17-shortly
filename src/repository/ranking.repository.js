import { connection } from "../database/db.js";

export function getRankingList(){
    return connection.query(`SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", SUM(COALESCE(urls."visitCount", 0)) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`)
}