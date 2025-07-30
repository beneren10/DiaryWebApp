const db = require('../database/connect');

class User {

    constructor({ user_id, email, password, is_admin, name }) {
        this.id = user_id;
        this.email = email;
        this.password = password;
        this.isAdmin = is_admin;
        this.name = name
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
        const { email, password, name, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (email, password, name) VALUES ($1, $2, $3) RETURNING user_id;",
            [email, password, name]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;