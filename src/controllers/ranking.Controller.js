import { connection } from "../database/db.js";

export async function getRanking(req, res){

    try{
        const rankingList = await connection.query(`SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" LIMIT 10`)

        rankingList.rows.forEach(i => {
            i.linksCount = Number(i.linksCount)
            if(i.visitCount === null){
                i.visitCount = 0;
            }else{
                i.visitCount = Number(i.visitCount)
            }
        })

        res.send(rankingList.rows).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}
