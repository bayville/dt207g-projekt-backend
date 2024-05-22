//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');

//create main Model
const Model = db.status;

//function to add a new MenuItem
const addStatus = async (req, res) => {

    //Extracting information from the request body
    const itemInfo = {
        name: req.body.name,
    }
    return await createItem(Model, itemInfo, req, res);
}

const getAllStatuses = async (req, res) => {
    return await getAllItems(Model, res);
}


// //Function to update an existing MenuItem
const updateStatus = async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        statusId: req.body.status,
    }
    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing menuItem
const deleteStatus = async (req, res) => {
    return await deleteItem(Model, req, res);
}


//Exporting all controller functions for use in routes
module.exports = { addStatus, getAllStatuses, updateStatus, deleteStatus  };
