const db = require('../db/db');

const userQueries = require('./users');

const getAdminByEmail = async (email) => {
    return await db.one('SELECT * FROM administration WHERE a_email = $1', email)
}

const addAdmin = async (firstName, lastName, email, newPassword, oldPassword, admin) => {
    // Update the password of the new admin whom already registered into the users_data
    const registeredUser = await userQueries.updatePassword(email, newPassword);

    const insertQuery = `
        INSERT INTO administration (a_first_name, a_last_name, a_email, admin) VALUES
        ($1, $2, $3, $4) RETURNING *
    `
    try {
        return await db.one(insertQuery, [firstName, lastName, email, admin]);
    } catch (err) {
        if (registeredUser) { // if adding the new admin to administration table fails, the password gets reset
            userQueries.updatePassword(email, oldPassword);
        }
        throw err;
    }
}

const updateAdmin = async (id, firstName, lastName) => {
    const updateQuery = `
        UPDATE administration 
            SET a_first_name = $2, a_last_name = $3
            WHERE a_id = $1
            RETURNING *
    `
    return await db.one(updateQuery, [id, firstName, lastName]);
}

const deleteAdmin = async (id) => {
    return await db.one('DELETE FROM administration WHERE a_id = $1 RETURNING *', id);
}


module.exports = {
    getAdminByEmail,
    addAdmin,
    updateAdmin,
    deleteAdmin
}