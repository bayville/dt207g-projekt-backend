//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');

//create main Model
const Model = db.customer;

//function to add a new item
const createCustomer = async (req, res) => {

    //Extracting information from the request body
    const itemInfo = {
        firstname: req.body.firstname,
        lastnamne: req.body.lastnamne,
        email: req.body.email,
        phone: req.body.phone
    }

    return await createItem(Model, itemInfo, req, res);
}

const getAllCustomers = async (req, res) => {
    return await getAllItems(Model, res);
}

//Function to get a single menu by ID
const getOneCustomer = async (req, res) => {
    try {
        // Extracting the item ID from the request parameters
        console.log(req.body);
        const email = req.body.email;

        // Finding the item by its ID
        const item = await Model.findOne({ where: { email: email } });

        // If item is not found, return a 404 error
        if (!item) {
            return res.status(404).json({ message: `Ingen kund hittades` });
        }

        // Returning the found item as JSON response
        return res.status(200).json(item);
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error getting item: ${error}`);
        return res.status(500).json({ message: 'An error occurred while getting the item.' });
    }
}

// //Function to update an existing item
const updateCustomer = async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        firstname: req.body.firstname,
        lastnamne: req.body.lastnamne,
        email: req.body.email,
        phone: req.body.phone
    }

    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing item
const deleteCustomer = async (req, res) => {
    return await deleteItem(Model, req, res);
}



//Exporting all controller functions for use in routes
module.exports = { createCustomer, getAllCustomers, getOneCustomer, updateCustomer, deleteCustomer};
