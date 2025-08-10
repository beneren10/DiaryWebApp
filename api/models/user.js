const db = require('../database/connect');

class User {

    constructor({ user_id, email, password, is_admin, name, token, tokenExpiry }) {
        this.id = user_id;
        this.email = email;
        this.password = password;
        this.isAdmin = is_admin;
        this.name = name;
        this.token = token;
        this.tokenExpiry = tokenExpiry;
    }

    static async getOneById(id) {
        const response = await db.query(`
            SELECT * FROM user_account 
            WHERE user_id = $1`, 
            [id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(email) {
        const response = await db.query(`
            SELECT * FROM user_account 
            WHERE email = $1`, 
            [email]);

        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByToken(param) {
        const response = await db.query(`
            SELECT * FROM user_account 
            WHERE resettoken = $1 
            AND resettokenexpiry > NOW() 
            LIMIT 1`,
            [param])
        
        if (response.rows.length != 1){
            throw new Error('Unable to locate token user')
        }
        return new User(response.rows[0])
    }

    static async create(data) {
        const { email, password, name, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (email, password, name) VALUES ($1, $2, $3) RETURNING user_id;",
            [email, password, name]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }

    async updateToken(data){
        const { token, tokenExpiry, email} = data
        const response = await db.query(`
            UPDATE user_account
            SET resettoken = $1, resettokenexpiry = $2
            WHERE email = $3
            RETURNING *`, 
            [token],[tokenExpiry],[email])

        if (response.rows.length === 0) {
            throw new Error('No user found with this email')
        }
        return new User(response.rows[0])
    }

    async updateTokenPass(data){
        const { token, tokenExpiry, password, email} = data
        const response = await db.query(`
            UPDATE user_account
            SET resettoken = $1, resettokenexpiry = $2, password = $3
            WHERE email = $4
            RETURNING *`, 
            [token],[tokenExpiry],[password],[email])

        if (response.rows.length === 0) {
            throw new Error('No user found with this email')
        }
        return new User(response.rows[0])
    }
}

module.exports = User;