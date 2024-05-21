//Importing db from index.js
const db = require('../models');

//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');

//create main Model
const Model = db.category;

//function to add a new category
const addCategory = async (req, res) => {
    //Extracting information from the request body
    const itemInfo = {
        name: req.body.name,
        description: req.body.description,
        published: req.body.published,
        order: req.body.order,
    }
    return await createItem(Model, itemInfo, req, res);
}

const getAllCategories = async (req, res) => {
    return await getAllItems(Model, res);
}

//Function to get a single menu by ID
const getOneCategory = async (req, res) => {
    return getOneItem(Model, req, res);
}

// //Function to update an existing category
const updateCategory = async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        name: req.body.name,
        description: req.body.description,
        published: req.body.published,
        order: req.body.order,
    }
    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing menuitem
const deleteCategory = async (req, res) => {
    return await deleteItem(Model, req, res);
}

const getAllPublishedCategories = async (req, res) => {
    try {
        // Gets all published categories and order them after order
        const categories = await Model.findAll({
            where: { published: true }, // Only get published categories
            order: [['order', 'ASC']] // Sort in ascending order
        });
        console.log(categories);
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while getting the categories.', error });
    }
};

//Exporting all controller functions for use in routes
module.exports = { addCategory, getAllCategories, getOneCategory, deleteCategory, updateCategory, getAllPublishedCategories };
