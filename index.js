const express = require('express')
const cors = require('cors');
const { gameAPIController } = require('./Controller/GameAPIControllerManager')
const { webAPIController } = require('./Controller/WebAPIControllerManager')

const app = express()

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

//PORT Config
var PORT = process.env.PORT || 8081

//Manage Routers
app.use('/gameAPI/processRequest', gameAPIController.Performtask);
app.use('/webAPI/processRequest', webAPIController.Performtask);


app.listen(PORT, () => console.log('App is running on port ' + PORT));