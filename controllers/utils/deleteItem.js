// utils.js (eller motsvarande fil)

const deleteItem = async (Model, req, res, ) => {
    try {
        console.log(req.params.id);
        // Extracting the item ID from the request parameters
        const id = req.params.id;
        console.log(id);

        // Finding the item by its ID
        const item = await Model.findByPk(id);
     
        // If item is not found, return a 404 error
        if (!item) {
            return res.status(404).json({ message: `${Model.name} not found` });
        }

        // Deleting the item from the database
        await item.destroy();

        // // Returning a success message as JSON response
        // return res.status(204).json({ message: `${Model.name} deleted successfully` });
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error deleting ${Model.name.toLowerCase()}:`, error);
        return res.status(500).json({ message: `An error occurred while deleting the ${Model.name.toLowerCase()}.` });
    }
}

module.exports = deleteItem ;
