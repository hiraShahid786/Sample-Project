const { sql } = require('../config/dbConfig');

// Get all users with pagination and search
const getUsers = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query; // Default values
    const offset = (page - 1) * limit;

    try {
        const query = `
            SELECT * FROM Users
            WHERE first_name LIKE '%${search}%' OR last_name LIKE '%${search}%' OR email LIKE '%${search}%'
            ORDER BY id ASC
            OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
        `;
        const totalQuery = `
            SELECT COUNT(*) as total FROM Users
            WHERE first_name LIKE '%${search}%' OR last_name LIKE '%${search}%' OR email LIKE '%${search}%';
        `;
        
        const result = await sql.query(query);
        const totalResult = await sql.query(totalQuery);

        res.status(200).json({
            users: result.recordset,
            total: totalResult.recordset[0].total,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add a new user
const addUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        await sql.query(
            `INSERT INTO Users (first_name, last_name, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}')`
        );
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get extra details for a specific user
const getExtraDetailsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await sql.query(`SELECT * FROM ExtraDetails WHERE user_id = ${userId}`);
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add extra details for a specific user
const addExtraDetails = async (req, res) => {
    const { user_id, user_name, gender, comments, status, first_login } = req.body;
    try {
        await sql.query(
            `INSERT INTO ExtraDetails (user_id, user_name, gender, comments, status, first_login) 
             VALUES (${user_id}, '${user_name}', '${gender}', '${comments}', '${status}', '${first_login}')`
        );
        res.status(201).json({ message: 'Extra details added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUsers, addUser, getExtraDetailsByUserId, addExtraDetails };
