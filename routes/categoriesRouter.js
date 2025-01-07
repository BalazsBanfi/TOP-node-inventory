const { Router } = require("express");
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();
//TO DO category add post
categoryRouter.get("/", categoryController.getAllCategory);
categoryRouter.get("/new", categoryController.getNewCategory);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/new", categoryController.postNewCategory);
/*categoryRouter.get("/delete", categoryController.getDeleteAllCategory);
categoryRouter.get(
    "/category/:id/delete",
    categoryController.getDeleteCategoryById
);
categoryRouter.get(
    "/category/:id/edit",
    categoryController.getUpdateCategoryById
);
categoryRouter.post("/category/:id/edit", categoryController.postUpdateCategoryById);
*/
module.exports = categoryRouter;