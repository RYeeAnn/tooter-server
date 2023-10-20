require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const app = express();

const PORT = process.env.PORT || 5050;
const EXTERNAL_API_URL = 'https://online-tutoring-system-api.herokuapp.com';

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // This will handle URL-encoded data

app.post("/api/v1/tutors/signup", (req, res) => {
    console.log('Received request:', req.body); // Log the received request
    axios.post(`${EXTERNAL_API_URL}/api/v1/tutors/signup`, qs.stringify(req.body))
        .then(externalResponse => {
            res.status(externalResponse.status).send(externalResponse.data);
        })
        .catch(error => {
            console.error("Error interacting with external API:", error.response ? error.response.data : error.message);
            res.status(500).send("Error interacting with external API. " + (error.response ? error.response.data : error.message));
        });
});


app.get("/api/v1/tutors/login", (req, res) => {
    axios.get(`${EXTERNAL_API_URL}/api/v1/tutors/login`)
        .then(externalResponse => {
            res.status(externalResponse.status).send(externalResponse.data);
        })
        .catch(error => {
            res.status(500).send("Error interacting with external API.");
        });
});

app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`)
});
