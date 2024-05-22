const express = require('express'); //Import express
const app = express(); // Creating a Express app
const cors = require('cors'); // Importing CORS

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Add support for parsing incoming JSON

const port = process.env.PORT || 3000; //Set port to env-variable or use 3000

const menuItems = require('./routes/menuItemRouter.js');
const users = require('./routes/userRouter.js');
const categories = require('./routes/categoryRouter.js');
const orders = require('./routes/orderRouter.js');
const customers = require('./routes/customerRouter.js');
const hours = require('./routes/openHoursRouter.js');
const mails = require('./routes/mailRouter.js')

//Add support for cors
app.use(cors({ methods: 'GET,PUT,POST,DELETE' }));



app.use('/api/menuitem', menuItems);
app.use('/api/user', users);
app.use('/api/category', categories);
app.use('/api/order', orders);
app.use('/api/customer', customers);
app.use('/api/openhours', hours);
app.use('/api/mail', mails);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });