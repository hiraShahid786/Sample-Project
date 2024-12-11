const sql = require('mssql');

const sqlConfig = {
    user: 'sample_user', // The SQL login username
    password: 'StrongPassword123!', // The password for the SQL login
    server: 'ACP-DUBAI-023\\SQLEXPRESS01', // Your SQL Server name
    database: 'SampleDB', // The name of your database
    options: {
        trustServerCertificate: true, // True if using a self-signed certificate
        enableArithAbort: true, // Recommended for certain versions of SQL Server
    },
};

const connectDB = async () => {
    try {
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
};

module.exports = { connectDB, sql };
