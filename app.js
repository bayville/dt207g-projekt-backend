const express = require('express'); //Import express
const app = express(); // Creating a Express app
const cors = require('cors'); // Importing CORS

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Add support for parsing incoming JSON

const port = process.env.PORT || 3000; //Set port to env-variable or use 3000

//Add support for cors
app.use(cors({ methods: 'GET,PUT,POST,DELETE' }));


//Import routes
const users = require('./routes/userRouter.js');
const categories = require('./routes/categoryRouter.js');
const menuItems = require('./routes/menuItemRouter.js');

//Routes
app.use('/api/user', users);
app.use('/api/category', categories);
app.use('/api/menuitem', menuItems);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });