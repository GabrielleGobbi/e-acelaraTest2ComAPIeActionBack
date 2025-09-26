import express from "express";
import { validateTokenMiddleware } from "../middleware/validateTokenMiddleware";
import { LoginController } from "../controllers/login/LoginController";
import { ProgressController } from "../controllers/progress/ProgressController";
import { ContentController } from "../controllers/content/ContentController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

router.post("/login", (req, res) =>
  new LoginController().registerUser(req, res)
);

// Rotas públicas de conteúdo (sem autenticação)
router.get("/themes", (req, res, next) =>
  new ContentController().getThemes(req, res, next)
);

router.get("/themes/:id", (req, res, next) =>
  new ContentController().getThemeById(req, res, next)
);

router.get("/topics", (req, res, next) =>
  new ContentController().getTopics(req, res, next)
);

router.get("/topics/:id", (req, res, next) =>
  new ContentController().getTopicById(req, res, next)
);

router.get("/exercises", (req, res, next) =>
  new ContentController().getExercises(req, res, next)
);

router.get("/exercises/:id", (req, res, next) =>
  new ContentController().getExerciseById(req, res, next)
);

router.get("/content/stats", (req, res, next) =>
  new ContentController().getProgressStats(req, res, next)
);

router.use(validateTokenMiddleware);

router.get("/status/:id/:idType", (req, res) =>
  new ProgressController().getTopicExercisesStatusProgress(req, res)
);

router.put("/status/:topicId/item/:itemId", (req, res) =>
  new ProgressController().saveStatusProgress(req, res)
);

router.get("/status/:topicId/item/:itemId", (req, res) =>
  new ProgressController().getExerciseStatusProgress(req, res)
);

router.get("/progress/:id/:idType", (req, res) =>
  new ProgressController().getProgressPercentageById(req, res)
);

router.get("/themes/progress", (req, res) =>
  new ProgressController().getThemeProgress(req, res)
);

export default router;
