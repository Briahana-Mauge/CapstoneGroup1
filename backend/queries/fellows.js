/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
FELLOWS Route Queries | Capstone App (Pursuit Volunteer Mgr)
*/


/* DB CONNECTION */
const db = require('../db/db');

const userQueries = require('./users');


/* QUERIES */
const getAllFellows = async (askedForMentor) => {
  const getQuery = `
    SELECT *
    FROM fellows
    $/mentorFilter:raw/
    ORDER BY f_first_name ASC;
  `;
  let mentorFilter = "";
  if (askedForMentor === true) {
    mentorFilter = `WHERE want_mentor = TRUE`;
  }
  return await db.any(getQuery, { mentorFilter });
}

const getFellowById = async (fId) => {
  const getQuery = `
    SELECT *
    FROM fellows
    WHERE f_id = $/fId/;
  `;
  return await db.one(getQuery, { fId });
}

const getFellowByEmail = async (fEmail) => {
  const getQuery = `
    SELECT *
    FROM fellows
    WHERE f_email = $/fEmail/;
  `;
  return await db.one(getQuery, { fEmail });
}

const addFellow = async (userObj, password) => {
  // adds fellow login to users_data table
  const registeredUser = await userQueries.addUser(userObj.fEmail, password, 'fellow');

  // continues with adding rest of fellow info
  const postQuery = `
    INSERT INTO fellows (
        f_first_name,
        f_last_name,
        f_email,
        cohort_id
    ) VALUES (
        $/fFirstName/,
        $/fLastName/,
        $/fEmail/,
        $/cohortId/
    )
    RETURNING *;
  `;

  try {
    return await db.one(postQuery, userObj);
  } catch (err) {
    // immediately undo add to users_data table if any error adding remainder of data to fellows table
    if (registeredUser) {
        userQueries.deleteUser(userObj.fEmail);
    }
    throw (err);
  }
}

const editFellow = async (userObj) => {
  const updateQuery = `
    UPDATE fellows
    SET
      f_first_name = $/fFirstName/,
      f_last_name = $/fLastName/,
      f_picture = $/fPicture/,
      f_bio = $/fBio/,
      f_linkedin = $/fLinkedIn/,
      f_github = $/fGithub/,
      want_mentor = $/wantMentor/
    WHERE f_id = $/fellowId/
    RETURNING *;
  `;
  return await db.one(updateQuery, userObj);
}

const removeFellow = async (fId) => {
  const deleteQuery = `
    DELETE FROM fellows
    WHERE f_id = $/fId/
    RETURNING *;
  `;
  return await db.one(deleteQuery, { fId });
}


/* EXPORT */
module.exports = {
  getAllFellows,
  getFellowById,
  getFellowByEmail,
  addFellow,
  editFellow,
  removeFellow
}