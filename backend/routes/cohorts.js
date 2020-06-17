/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
COHORTS Route Handler | Capstone App (Pursuit Volunteer Mgr)
*/


/* MODULE INITS */
const express = require('express');
const router = express.Router();

const handleError = require('../helpers/handleError');
const processInput = require('../helpers/processInput');
const queries = require('../queries/cohorts');


/* MIDDLEWARE FUNCTIONS */
const getAllCohorts = async (req, res, next) => {
  try {
    const allCohorts = await queries.selectAllCohorts();
    res.status(200);
    res.json({
        status: "success",
        message: "all cohorts retrieved",
        payload: allCohorts
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const getCohortById = async (req, res, next) => {
  try {
    const cohortId = processInput(req.params.cohort_id, "idNum", "cohort id");
    const cohort = await queries.selectCohortById(cohortId);
    res.status(200);
    res.json({
        status: "success",
        message: `cohort.${cohortId} retrieved`,
        payload: cohort
    });
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const postCohort = async (req, res, next) => {
  try {
    if (req.user && req.user.a_id && req.user.a_email !== 'demo@pursuit.org') {
      const cohort = processInput(req.body.cohort, "hardVC", "cohort name", 100);
  
      const response = await queries.insertCohort(cohort);
      res.status(201);
      res.json({
          status: "success",
          message: `new cohort '${cohort}' added`,
          payload: response
      });
    } else if (req.user && req.user.a_id && req.user.a_email === 'demo@pursuit.org') {
      throw new Error('403__Sorry as a demo user your privileges are limited compared to a real admin user, you can not add a cohort');
    } else{
      throw new Error('403__Not allowed to perform this operation');
    }
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const putCohort = async (req, res, next) => {
  try {
    if (req.user && req.user.a_id && req.user.a_email !== 'demo@pursuit.org') {
      const cohortId = processInput(req.params.cohort_id, "idNum", "cohort id");
      const cohort = processInput(req.body.cohort, "hardVC", "cohort name", 100);
  
      const response = await queries.updateCohort({ cohortId, cohort });
      res.status(200);
      res.json({
          status: "success",
          message: `cohort.${cohortId} has been renamed to '${cohort}'`,
          payload: response
      });
    } else if (req.user && req.user.a_id && req.user.a_email === 'demo@pursuit.org') {
      throw new Error('403__Sorry as a demo user your privileges are limited compared to a real admin user, you can not edit a cohort');
    } else {
      throw new Error('403__Not allowed to perform this operation');
    }
  } catch (err) {
    handleError(err, req, res, next);
  }
};

const delCohort = async (req, res, next) => {
  try {
    if (req.user && req.user.a_id && req.user.a_email !== 'demo@pursuit.org') {
      const cohortId = processInput(req.params.cohort_id, "idNum", "cohort id");
      const response = await queries.deleteCohort(cohortId);
      res.status(200);
      res.json({
          status: "success",
          message: `cohort.${cohortId} has been deleted`,
          payload: response
      });
    } else if (req.user && req.user.a_id && req.user.a_email === 'demo@pursuit.org') {
      throw new Error('403__Sorry as a demo user your privileges are limited compared to a real admin user, you can not delete a cohort');
    } else {
      throw new Error('403__Not allowed to perform this operation');
    }
  } catch (err) {
    handleError(err, req, res, next);
  }
};


/* ENDPOINT HANDLERS */
router.get("/", getAllCohorts);
router.get("/id/:cohort_id", getCohortById);
router.post("/add/", postCohort);
router.put("/edit/:cohort_id", putCohort);
router.delete("/del/:cohort_id", delCohort);


module.exports = router;
