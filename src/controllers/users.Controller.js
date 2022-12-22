import { getSectionByToken, getUserById, getUrlsByUserId } from "../repository/users.repository.js";

export async function getUserData(req, res){
    const {authorization} = req.headers;

    if(!authorization){
        res.sendStatus(401);
        return;
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const section = await getSectionByToken(token)

        if(section.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const user = await getUserById(section.rows[0].userId)

        if(user.rows.length === 0){
            res.sendStatus(404)
            return
        }

        const urls = await getUrlsByUserId(user.rows[0].id)

        user.rows[0].visitCount = Number(user.rows[0].visitCount)
        user.rows[0].shortenedUrls = urls.rows

        res.send(user.rows[0]).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}


