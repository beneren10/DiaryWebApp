const db = require("../database/connect");

class Diary {
  constructor({ id, date, time, text, category, title }) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.text = text;
    this.category = category;
    this.title = title;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM diary ORDER BY id DESC;");

    if (response.rows.length === 0) {
      throw new Error("No diary posts available.");
    }

    return response.rows.map((entry) => new Diary(entry));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM diary WHERE id = $1;", [id]);

    if (response.rows.length !== 1) {
      throw new Error("Unable to find diary entry.");
    }

    return new Diary(response.rows[0]);
  }

  static async getByDate(date) {
    console.log("date", date);
    const response = await db.query("SELECT * FROM diary WHERE date = $1;", [date]);
    if (response.rows.length === 0) {
      throw new Error("No diary entries found for this date.");
    }
    return response.rows.map((entry) => new Diary(entry));
  }


  static async create(data) {
    const { category, title, text, date} = data;
    const response = await db.query('INSERT INTO diary (category, text, title, date) VALUES ($1, $2, $3, DEFAULT) RETURNING *;',[category, text, title]
    );

    return new Diary(response.rows[0]);
  }

 
  async update(data) {
    const { category, text, title } = data;
    const existingEntry = await db.query("SELECT id FROM diary WHERE id = $1;", [this.id]);

    if (existingEntry.rows.length > 0) {
      const response = await db.query("UPDATE diary SET entry_date = CURRENT_DATE, entry_time = CURRENT_TIME, category = $1, text = $2, title = $3 WHERE id = $4 RETURNING *;",[category, text, title, this.id]
      );

      return new Diary(response.rows[0]);
    } else {
      throw new Error("Diary entry not found.");
    }
  }


  async destroy() {
    const response = await db.query("DELETE FROM diary WHERE id = $1 RETURNING *;", [this.id]);

    if (response.rows.length === 0) {
      throw new Error("Diary entry not found.");
    }

    return new Diary(response.rows[0]);
  }
}

module.exports = Diary;