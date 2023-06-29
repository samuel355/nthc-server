const express = require('express') 
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./connectDB');
const contactUsRouter = require('./routes/ContactUsRoutes.js')
const userRouter = require('./routes/UserRoutes.js');
const plotRouter = require('./routes/PlotRoutes.js');
const visitorRouter = require('./routes/VisitorRoutes.js');

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

//Routes
app.use('/api', contactUsRouter)
app.use('/api', userRouter) //User Router
app.use('/api', plotRouter)
app.use('/api', visitorRouter)

app.listen(port, console.log(`NTHC PLOTS Server is running on port ${port}`));