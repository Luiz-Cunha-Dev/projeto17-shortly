import { getRankingList } from "../repository/ranking.repository.js";

export async function getRanking(req, res){

    try{
        const rankingList = await getRankingList()

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
