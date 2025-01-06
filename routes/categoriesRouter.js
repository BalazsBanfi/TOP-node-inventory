const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getIndex);
categoryRouter.get("/category", categoryController.getAllCategory);
categoryRouter.get("/new", categoryController.getNewCategory);
categoryRouter.get("/category/:id", categoryController.getCategoryById);
categoryRouter.post("/new", categoryController.postNewCategory);
categoryRouter.get("/delete", categoryController.getDeleteAllCategory);
categoryRouter.get(
    "/category/:id/delete",
    categoryController.getDeleteCategoryById
);
categoryRouter.get(
    "/category/:id/edit",
    categoryController.getUpdateCategoryById
);
categoryRouter.post("/category/:id/edit", categoryController.postUpdateCategoryById);


module.exports = categoryRouter;