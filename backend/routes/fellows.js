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

const readFellowById = async (req, res, next) => {
  try {
    const fId = processInput(req.params.id, "idNum", "fellow id");

    const fellowById = await queries.getFellowById(fId);
    res.status(200);
    res.json({
        status: "success",
        message: `fellow.${fId} retrieved`,
        payload: fellowById
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const readFellowByEmail = async (req, res, next) => {
  try {
    const fEmail = processInput(req.params.email, "hardVC", "fellow email", 50);

    const fellowByEmail = await queries.getFellowByEmail(fEmail);
    res.status(200);
    res.json({
        status: "success",
        message: `fellow of ${fEmail} retrieved`,
        payload: fellowByEmail
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const createFellow = async (req, res, next) => {
  try {
    const fFirstName = processInput(req.body.fFirstName, "hardVC", "first name", 30);
    const fLastName = processInput(req.body.fLastName, "hardVC", "last name", 30);
    const fEmail = processInput(req.body.fEmail, "hardVC", "fellow email", 50);
    const cohortId = processInput(req.body.cohort_id, "idNum", "cohort id");

    const response = await queries.addFellow({
        fFirstName,
        fLastName,
        fEmail,
        cohortId
    });
    res.status(201);
    res.json({
        status: "success",
        message: `new fellow '${fFirstName} ${fLastName}' added`,
        payload: response
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const updateFellow = async (req, res, next) => {
  try {
    const fId = processInput(req.params.id, "idNum", "fellow id");
    const fFirstName = processInput(req.body.fFirstName, "hardVC", "first name", 30);
    const fLastName = processInput(req.body.fLastName, "hardVC", "last name", 30);
    // const fEmail = processInput(req.body.fEmail, "hardVC", "fellow email", 50);
    const fPicture = processInput(req.body.fPicture, "softVC", "picture url", undefined);
    const fBio = processInput(req.body.fBio, "softVC", "bio", undefined);
    const fLinkedIn = processInput(req.body.fLinkedIn, "softVC", "linkedin url", 150);
    const fGithub = processInput(req.body.fGithub, "softVC", "github url", 150);
    const wantMentor = processInput(req.body.wantMentor, "bool", "want mentor bool");

    const response = await queries.editFellow({
        fId,
        fFirstName,
        fLastName,
        // fEmail,
        fPicture,
        fBio,
        fLinkedIn,
        fGithub,
        wantMentor
    });
    res.status(200);
    res.json({
        status: "success",
        message: `fellow.${fId} data has been updated`,
        payload: response
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const deleteFellow = async (req, res, next) => {
  try {
    const fId = processInput(req.params.id, "idNum", "fellow id");
    const response = await queries.removeFellow(fId);
    res.status(200);
    res.json({
        status: "success",
        message: `fellow.${fId} has been deleted`,
        payload: response
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};


/* ENDPOINT HANDLERS */
router.get("/", readAllFellows);
router.get("/id/:id", readFellowById);
router.get("/email/:email", readFellowByEmail);
router.post("/create", createFellow);
router.put("/update/:id", updateFellow);
router.delete("/delete/:id", deleteFellow);


module.exports = router;