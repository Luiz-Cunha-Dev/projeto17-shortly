import { nanoid } from 'nanoid'
import { getSectionByToken, insertNewShortUrl, getUrlById, getUrlByShortUrl, updateVisitCountFromUrls, getUserIdFromUrls, deleteUrlById } from "../repository/urls.repository.js";
import dayjs from 'dayjs';

export async function shortener(req, res){
    const {url} = req.body;
    const {authorization} = req.headers;

    if(!authorization){
        res.sendStatus(401);
        return;
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const section = await getSectionByToken(token);

        if(section.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const shortUrl = nanoid(8);

        await insertNewShortUrl(section.rows[0].userId, shortUrl, url)


        res.send({shortUrl}).status(201)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function searchUrl(req, res){
    const {id} = req.params;

    try{
        const url = await getUrlById(id)

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
        const url = await getUrlByShortUrl(shortUrl)

        if(url.rows.length === 0){
            res.sendStatus(404)
            return
        }

        await updateVisitCountFromUrls(url.rows[0].visitCount+1, shortUrl)

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
        const section = await getSectionByToken(token);

        if(section.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const url = await getUserIdFromUrls(id)

        if(url.rows.length === 0){
            res.sendStatus(404)
            return
        }

        if(section.rows[0].userId !== url.rows[0].userId){
            res.sendStatus(401)
            return
        }

        await deleteUrlById(id)

        res.sendStatus(204)
        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}