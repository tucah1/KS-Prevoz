const express = require("express");
const { body, validationResult } = require("express-validator");

const getConnection = require("../config/database");

const router = express.Router();
const authMiddleware = require("../middleware/auth");

// @route GET api/favorites/getFavorites
// @desc Fetch user's favorite lines from database
// @access Private
router.get("/getFavorites", authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((x) => {
        let { msg, ...new_x } = x;
        new_x["message"] = msg;
        new_x["code"] = 422;
        return new_x;
      }),
    });
  }

  try {
    const connection = await getConnection();
    let result = await connection.query(
      "SELECT * FROM line WHERE line_id IN (SELECT line_id FROM favorite WHERE app_user_id = ?)",
      req.user.id
    );
    connection.release();
    let favoriteLines = result[0];

    // if(favoriteLines.length == 0){
    //     return res.status(200).json({message: 'Favorite list is empty!'})
    // }
    return res.status(200).json(favoriteLines);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ code: 500, message: "Server error" }] });
  }
});

// @route api/favorites/addFavorite
// @desc Add a line to user's favorites
// @access Private
router.post("/addFavorite", authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((x) => {
        let { msg, ...new_x } = x;
        new_x["message"] = msg;
        new_x["code"] = 422;
        return new_x;
      }),
    });
  }

  try {
    const connection = await getConnection();
    let result = await connection.query(
      "INSERT INTO favorite (app_user_id, line_id) VALUES (?,?)",
      [req.user.id, req.body.line_id]
    );
    connection.release();
    return res
      .status(201)
      .json({ message: "Line successfully added to favorite list!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ code: 500, message: "Server error" }] });
  }
});

// @route api/favorites/deleteFavorite
// @desc Delete a line from user's favorites
// @access Private
router.delete("/deleteFavorite", authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((x) => {
        let { msg, ...new_x } = x;
        new_x["message"] = msg;
        new_x["code"] = 422;
        return new_x;
      }),
    });
  }

  try {
    const connection = await getConnection();
    let result = await connection.query(
      "DELETE FROM favorite WHERE (app_user_id, line_id)=(?,?)",
      [req.user.id, req.body.line_id]
    );
    connection.release();
    return res
      .status(200)
      .json({ message: "Line successfully deleted from favorite list!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ code: 500, message: "Server error" }] });
  }
});

module.exports = router;
