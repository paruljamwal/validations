const express = require("express");
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require("express-validator");
const usermodel = require("../model/usermodel");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const users = await usermodel.find().lean().exec();
        return res.status(202).send({ Users: users });
    } catch (err) {
        res.status(404).send("Somthing went wrong Please try again later");
    }
});

router.post("/",
    body("first_name").trim().not().isEmpty().withMessage("Firstname is required").bail().isLength({ min: 3 }).withMessage("Firstname must be atleast 3 characters").bail(),
    body("pincode").not().isEmpty().isLength({ min: 6 }).bail(),
    body("email").not().isEmpty().withMessage("email is required").bail().isEmail().withMessage("Please check your email").bail(),
    body("gender").not().isEmpty().withMessage("gender is required").bail(),
    body("age").not().isEmpty().withMessage("Age cannot be empty").isNumeric().bail().withMessage("Age must be a number between 1 and 100").bail().custom((value) => {
        if (value < 1 || value > 100) {
            throw new Error("Incorrect age provide");
        }
        else {
            return true;
        }
    }).bail(),
    body("lastname").custom((value) => {
        if (value && value.length < 3) {
            throw new Error("Lastname must be atleast 3 characters")
        }

        return true;
    }).bail(),

    async (req, res) => {

        try {
            // console.log(body("firstname"));
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            //   console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const users = await usermodel.create(req.body);
            return res.status(201).send({ Users: users })
        }

        catch (err) {
            return res.status(404).send({ message: err.message });
        }
    });

module.exports = router;
