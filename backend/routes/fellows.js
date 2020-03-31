/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
FELLOWS Route Handler | Capstone App (Pursuit Volunteer Mgr)
*/


/* MODULE INITS */
const express = require('express');
const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/fellows');


/* MIDDLEWARE FUNCTIONS */
const readAllFellows = async (req, res, next) => {
  try {
    const allFellows = await queries.getAllFellows();
    res.status(200);
    res.json({
        status: "success",
        message: "all fellows retrieved",
        payload: allFellows
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const readFellow = async (req, res, next) => {
  try {
    const fellowId = processInput(req.params.fellow_id, "idNum", "fellow id");
    const fellowById = await queries.getFellowById(fellowId);
    res.status(200);
    res.json({
        status: "success",
        message: `fellow.${id} retrieved`,
        payload: fellowById
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};


/* ROUTE HANDLERS */
router.get("/", readAllFellows);
router.get("/:fellow_id", readFellow);


module.exports = router;
