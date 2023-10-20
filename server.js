require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'tooter'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });

  app.post("/api/v1/tutors/signup", (req, res) => {
    const { firstname, lastname, email, password, experience } = req.body;

    const query = `
      INSERT INTO tutors (firstname, lastname, email, password, experience)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(query, [firstname, lastname, email, password, experience], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: "Error inserting data into database" });
        }
        console.log('Data inserted, ID:', results.insertId);
        res.status(200).send({ message: "Signup data received and saved!" });
    });
});


app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`)
});
