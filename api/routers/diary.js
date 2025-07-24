const { Router } = require('express');

const diaryController = require('../controllers/diary');
const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.get("/entry/:date", diaryController.getByDate);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.post("/", diaryController.create);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;