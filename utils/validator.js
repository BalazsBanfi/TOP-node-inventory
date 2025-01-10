const { body } = require('express-validator');
const db = require('../db/categoryQueries');


const alphaErr = "must only contain letters.";
const numericErr = "must only contain numbers.";
const lengthNameErr = "must be between 1 and 64 characters.";
const lengthColorErr = "must be between 1 and 16 characters.";

const bodyShoes = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Shoes name can not be empty.")
        .isLength({ min: 1, max: 64 })
        .withMessage(`Name of shoes ${lengthNameErr}`),
    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Brand can not be empty.")
        .isLength({ min: 1, max: 64 })
        .withMessage(`Brand ${lengthNameErr}`),
    body("color")
        .trim()
        .notEmpty()
        .withMessage("Color can not be empty.")
        .isAlpha()
        .withMessage(`Color ${alphaErr}`)
        .isLength({ min: 1, max: 16 })
        .withMessage(`Color ${lengthColorErr}`),
    body("size")
        .trim()
        .notEmpty()
        .withMessage("Size can not be empty.")
        .isNumeric()
        .withMessage(`Size ${numericErr}`)
        .isLength({ min: 1, max: 16 })
        .withMessage(`Color ${lengthColorErr}`),
    body("price")
        .trim()
        .notEmpty()
        .withMessage("Price can not be empty.")
        .isNumeric()
        .withMessage(`Price ${numericErr}`)
        .isLength({ min: 1, max: 16 })
        .withMessage(`Price ${lengthColorErr}`),
];

const bodyCategory = [
    body("shoetype")
        .trim()
        .notEmpty()
        .withMessage("Category name can not be empty.")
        .isLength({ min: 1, max: 64 })
        .withMessage(`Category ${lengthNameErr}`)
        .custom(async value => {
            const category = await db.getCategoryByValue(value)
            console.log(category);
            if (category) {
                throw new Error('This category already exists');
            }
        }),
];

module.exports = { bodyShoes, bodyCategory };