import mysql from "mysql"

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-class'
});

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database');
// });

// module.exports = connection;
