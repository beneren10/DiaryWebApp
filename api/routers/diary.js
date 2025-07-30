const { Router } = require('express');

const diaryController = require('../controllers/diary');
const authenticator = require('../middleware/authenticator')
const diaryRouter = Router();

diaryRouter.get("/", authenticator, diaryController.index);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.get("/entry/:date", diaryController.getByDate);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.post("/", diaryController.create);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;