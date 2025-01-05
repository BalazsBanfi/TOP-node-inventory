const { Router } = require("express");
const shoesController = require("../controllers/shoesController");

const shoesRouter = Router();

shoesRouter.get("/", shoesController.getIndex);
shoesRouter.get("/shoes", shoesController.getAllShoes);
shoesRouter.get("/new", shoesController.getNewShoes);
shoesRouter.get("/shoes/:id", shoesController.getShoesById);
shoesRouter.post("/new", shoesController.postNewShoes);
shoesRouter.get("/delete", shoesController.getDeleteAllShoes);
shoesRouter.get(
    "/shoes/:id/delete",
    shoesController.getDeleteShoesById
);
shoesRouter.get(
    "/shoes/:id/edit",
    shoesController.getUpdateShoesById
);
shoesRouter.post("/shoes/:id/edit", shoesController.postUpdateShoesById);


module.exports = shoesRouter;