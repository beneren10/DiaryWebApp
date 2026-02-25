const Diary = require("../models/Diary");
const parseJwt = require("../parsejwt");

const index = async (req, res) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) throw new Error("Token missing");
    const decoded = parseJwt(token);
    const user_id = decoded.user_id;

    const diary = await Diary.getAll(user_id);

    res.status(200).send(diary);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const diary = await Diary.getOneById(id);
    res.status(200).json(diary);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function getByDate(req, res) {
  try {
    let date = req.params.date;
    const entries = await Diary.getByDate(date);
    res.status(200).json(entries);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    // I have to pass in the token Payload, which includes user ID to assign the value in the database against the user

    const token = req.headers.authorization;
    
    if (!token) throw new Error("Token missing");
    const decoded = parseJwt(token);
    const user_id = decoded.user_id;

    const newDiary = await Diary.create(req.body, user_id);
    res.status(201).send(newDiary);
  } catch (err) {
    res.status(409).send({ error: err });
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const diary = await Diary.getOneById(id);
    const result = await diary.update(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  const idParam = req.params.id;

  try {
    const diary = await Diary.getOneById(idParam);
    await diary.destroy();

    res.sendStatus(204);
  } catch (err) {
    res.status(404).send({ error: err });
  }
}

module.exports = { index, show, create, update, destroy, getByDate };
