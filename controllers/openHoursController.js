//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const updateItem = require('./utils/updateItem');
const createItem = require('./utils/createItem');


//create main Model
const Model = db.openHours;

const addDay = async (req, res) => {
    //Extracting information from the request body
    console.log("addDay");
    const itemInfo = {
        day: req.body.day,
        openTime: req.body.openTime,
        closeTime: req.body.closeTime
    }
    return await createItem(Model, itemInfo, req, res);
}

const getAllDays = async (req, res) => {
    return await getAllItems(Model, res);
}

//Function to get a single menu by ID
const getOneDay = async (req, res) => {
    return getOneItem(Model, req, res);
}

// //Function to update an existing category
const updateDay = async (req, res) => {

    //Extracting the data from the request body
    console.log(req.body);
    const itemInfo = {
        day: req.body.day,
        openTime: req.body.openTime,
        closeTime: req.body.closeTime
    }

    return await updateItem(Model, itemInfo, req, res);
}


//Exporting all controller functions for use in routes
module.exports = { addDay, getAllDays, getOneDay, updateDay};
