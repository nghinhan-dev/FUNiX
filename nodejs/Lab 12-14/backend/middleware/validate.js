const { check, body, validationResult } = require("express-validator");

const signUpValidator = () =>
  validator([
    body("userName").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ]);

const loginValidator = () =>
  validator([check(["userName", "password"]).notEmpty()]);

const addPrdValidator = () =>
  validator([
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .matches(/^[a-zA-Z0-9\s]+$/, "i")
      .withMessage("Title must not contain special characters"),

    body("imageUrl")
      .isURL({
        protocols: ["http", "https"],
        require_tld: true,
        require_protocol: true,
      })
      .withMessage("Invalid image URL"),

    body("price").isNumeric().withMessage("Price must be a numeric value"),

    body("description")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ]);

const validator = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};

module.exports = { signUpValidator, loginValidator, addPrdValidator };
