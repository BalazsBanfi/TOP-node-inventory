const { Router } = require("express");
const shoesControllers = require("../controllers/shoesController");

const shoesRouter = Router();

shoesRouter.get("/", shoesControllers.getIndex);
shoesRouter.get("/shoes", shoesControllers.getAllShoes);



//get all shoeses
//get 1 shoes details
//get new shoes
//post new shoes
//delete 1 shoes
//update 1 shoes
//delete all shoes
/*
shoesRouter.get("/", shoesControllers.getAllShoes);
shoesRouter.get("/new", shoesControllers.getNewShoes);
shoesRouter.post("/new", shoesControllers.postNewShoes);
shoesRouter.get("/delete", shoesControllers.getDeleteAllShoes);
shoesRouter.get("/shoes/:id", shoesControllers.getShoeById);
shoesRouter.get(
    "/shoes/:id/delete",
    shoesControllers.getDeleteShoesById
);
*/
module.exports = shoesRouter;