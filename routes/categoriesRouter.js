const { Router } = require("express");
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();
//TO DO category add post
categoryRouter.get("/", categoryController.getAllCategory);
categoryRouter.get("/new", categoryController.getNewCategory);
categoryRouter.get("/delete", categoryController.getDeleteAllCategory);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/new", categoryController.postNewCategory);
categoryRouter.get(
    "/:id/delete",
    categoryController.getDeleteCategoryById
);
categoryRouter.get(
    "/:id/edit",
    categoryController.getUpdateCategoryById
);
categoryRouter.post("/:id/edit", categoryController.postUpdateCategoryById);

module.exports = categoryRouter;