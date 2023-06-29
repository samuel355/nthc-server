const express = require('express') 
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./connectDB');

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 6006


connectDB() 

app.get('/api', (req, res) => {
    res.send(`API - Here we go again and N.T.H.C. server is running on port ${port}`)
})
app.get('/', (req, res) => {
    res.send(`MAIN - Here we go again and N.T.H.C. server is running on port ${port}`)
})

app.listen(port, console.log(`NTHC PLOTS Server is running on port ${port}`));