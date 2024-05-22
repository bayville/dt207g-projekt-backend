//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');

//create main Model
const Model = db.orderItem;

//function to add a new item
const addOrderItem = async (req, res) => {

    //Extracting information from the request body
    const itemInfo = {
        orderId: newOrder.id,
        menuItemId: item.id,
        quantity: item.quantity
    }

    return await createItem(Model, itemInfo, req, res);
}

const getAllOrderItems = async (req, res) => {
    return await getAllItems(Model, res);
}

//Function to get a single menu by ID
const getOneOrderItems = async (req, res) => {
    return getOneItem(Model, req, res);
}

// //Function to update an existing item
const updateOrderItem = async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        orderId: newOrder.id,
        menuItemId: item.id,
        quantity: item.quantity
    }

    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing item
const deleteOrderItem = async (req, res) => {
    return await deleteItem(Model, req, res);
}



//Exporting all controller functions for use in routes
module.exports = {};
