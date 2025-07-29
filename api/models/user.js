const db = require('../database/connect');

class User {

    constructor({ user_id, email, password, is_admin }) {
        this.id = user_id;
        this.email = email;
        this.password = password;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(email) {
        const response = await db.query("SELECT * FROM user_account WHERE email = $1", [email]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { email, password, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (email, password) VALUES ($1, $2) RETURNING user_id;",
            [email, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;