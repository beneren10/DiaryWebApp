const Diary = require("../models/Diary");

const index = async (req, res) => {
    console.log("index controller")
    try {
        const diary = await Diary.getAll();
        res.status(200).send(diary);
    } catch(err) {
        res.status(500).send({ error: "Server error" });
    }
}

async function show(req, res) {
    console.log('showing controller');
    console.log(req.params.id);
    try {
      const id = parseInt(req.params.id);
      const diary = await Diary.getOneById(id);
      res.status(200).json(diary);
    } catch (err) {
      res.status(404).json({ error: err.message })
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

async function create(req, res){
    try {
        console.log(req.body)
        const newDiary = await Diary.create(req.body);
        res.status(201).send(newDiary);
    } catch (err) {
        res.status(409).send({ error: err});
    }
};

async function update(req, res) {
    try {
      console.log('update hit');
      const id = parseInt(req.params.id);
      const data = req.body;
      console.log(data);
      const diary = await Diary.getOneById(id);
      console.log(diary);
      const result = await diary.update(data)
      
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  }

async function destroy(req, res) {
    const idParam = req.params.id

    try {
      const diary = await Diary.getOneById(idParam);
      await diary.destroy();

      res.sendStatus(204)
    } catch (err) {
      res.status(404).send({ error: err});
    }
};

module.exports = {index, show, create, update, destroy, getByDate}