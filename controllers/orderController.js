//Importing db from index.js
const db = require('../models');


//Importing generic functions
const getAllItems = require('./utils/getAllItems');
const getOneItem = require('./utils/getOneItem');
const deleteItem = require('./utils/deleteItem');
const createItem = require('./utils/createItem');
const updateItem = require('./utils/updateItem');
const { sendConfirmMail } = require('./mailController');

//create main Model
const Model = db.order;


//function to add a new MenuItem
const newOrder = async (req, res) => {
    const { customerData, totalAmount, item } = req.body;
    console.log(req.body);

    try {
        // Start a transaction to ensure atomicity
        const result = await db.sequelize.transaction(async (t) => {
            // Find or create the customer
            let foundCustomer = await db.customer.findOne({ where: { email: customerData.email }, transaction: t });
            if (!foundCustomer) {
                foundCustomer = await db.customer.create(customerData, { transaction: t });
            }

            // Create the order with the found or new customer ID 
            const newOrder = await db.order.create({
                customerId: foundCustomer.id,
                totalAmount: totalAmount
            }, { transaction: t });

            // Create the order items
            const orderItems = item.map(item => ({
                orderId: newOrder.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity
            }));
            await db.orderItem.bulkCreate(orderItems, { transaction: t });
            sendConfirmMail(customerData, totalAmount, item, newOrder, orderItems);
            return newOrder;
        });
        
        
    

        res.status(201).json({ result });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


const getAllOrders = async (req, res) => {
    try {
        console.log("Attempting to fetch orders...");

        // Fetching all orders from the database, including customer information
        const orders = await Model.findAll({
            include: [
                { model: db.customer, as: 'customer' }, 
                {
                    model: db.orderItem,
                    as: 'orderItems',
                    include: [
                        { model: db.menuItem, as: 'menuItems' },
                    ]
                }, 
                { model: db.status, as: 'status'}
            ]
        });

        console.log("Orders fetched successfully:", orders);

        // // Check if orders were found
        // if (!orders || orders.length === 0) {
        //     console.log("No orders found.");
        //     return res.status(404).json({ message: `No orders found` });
        // }

        // Send orders as JSON response
        console.log("Sending orders to client:", orders);
        res.json(orders);
    } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

const getOrderStatus = async (req,res) => {
    try {
        const orderId = req.params.id; // Antag att orderId är en parameter i URL:en
        const order = await db.order.findOne({
            where: { id: orderId},
            include: [ { model: db.status, as: 'status'} ]
        });
     // Kontrollera om ordern finns
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Skicka ordern som JSON-svar
        res.status(200).json(order);
    } catch (error) {
        // Logga eventuella fel som uppstår under hämtningen
        console.error('Error fetching order status:', error);
        res.status(500).json({ error: 'Failed to fetch order status' });
    }
}

//Function to get a single menu by ID
const getOneOrder = async (req, res) => {
    const orderId = req.params.id; // Antag att orderId är en parameter i URL:en
    console.log(orderId);
    console.log(req.params);
    try {
        // Hitta ordern med orderId och inkludera information om kunden och orderitems
        const order = await db.order.findOne({
            where: { id: orderId},
            include: [
                {
                    model: db.orderItem,
                    as: 'orderItems',
                    include: [
                        { model: db.menuItem, as: 'menuItems' },
                    ]
                }, 
                        { model: db.customer, as: 'customer' },
                        { model: db.status, as: 'status'}
            ]
        });

        // Kontrollera om ordern finns
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Skicka ordern som JSON-svar
        res.status(200).json(order);
    } catch (error) {
        // Logga eventuella fel som uppstår under hämtningen
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
}

// //Function to update an existing MenuItem
const updateOrder= async (req, res) => {

    //Extracting the data from the request body
    const itemInfo = {
        customerId: req.customer,
        totalAmount: req.totalAmount,
        status: req.status,
    }
    return await updateItem(Model, itemInfo, req, res);
}


const updateOrderStatus = async (req, res) => {
    
    //Extracting the data from the request body
    const itemInfo = {
        statusId: req.body.status.id,
    }
    console.log(itemInfo);

    return await updateItem(Model, itemInfo, req, res);
}

//Function to delete an existing menuItem
const deleteOrder = async (req, res) => {
    return await deleteItem(Model, req, res);
}



//Exporting all controller functions for use in routes
module.exports = { newOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder, updateOrderStatus, getOrderStatus };
