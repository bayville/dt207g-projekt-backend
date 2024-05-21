//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');

//create main Model
const Model = db.menuItem;

//function to add a new MenuItem
const addMenuItem = async (req, res) => {

    //Extracting information from the request body
    const itemInfo = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        published: req.body.published
    }

    return await createItem(Model, itemInfo, req, res);
}

const getAllMenuItems = async (req, res) => {
    try {
        // Fetching all items from the database using the provided model
        const items = await Model.findAll({
            include: [{ model: db.category, as: 'category', attributes: ['name'] },] //Include categories
        });

        // Returning all items as JSON response
        return res.status(200).json(items);
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error getting items from ${Model.name}:`, error);
        return res.status(500).json({ message: `An error occurred while getting the ${Model.name}.` });
    }
}

//Function to get a single menu by ID
const getOneMenuItem = async (req, res) => {
    return getOneItem(Model, req, res);
}

// //Function to update an existing MenuItem
const updateMenuItem = async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        published: req.body.published
    }
    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing menuItem
const deleteMenuItem = async (req, res) => {
    return await deleteItem(Model, req, res);
}


const getAllPublishedMenuItems = async (req, res) => {
    try {
        const menuItems = await Model.findAll({
            where: { published: true }, // Filter for published menu items
            include: [{ model: db.category, as: 'category', attributes: ['name'] },] //Include categories
          });
        return res.status(200).json( menuItems);
    } catch (error) {
        console.error('Error fetching published menu items:', error);
        return res.status(500).json({ message: 'An error occurred while getting the item.', error });

    }
};


//Exporting all controller functions for use in routes
module.exports = { addMenuItem, getAllMenuItems, getOneMenuItem, deleteMenuItem, updateMenuItem, getAllPublishedMenuItems };
