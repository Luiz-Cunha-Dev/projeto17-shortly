import { connection } from "../database/db.js";


export function getUserByEmail(email){
    return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export function insertNewUser(name, email, encryptedPassword){
    return connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, encryptedPassword]);
}

export function insertNewSection(userId, token){
    return connection.query(`INSERT INTO sections ("userId", token) VALUES ($1, $2)`, [userId, token]);
}