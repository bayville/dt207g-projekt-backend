const getOneItem = async (Model, req, res) => {
    try {
        // Extracting the item ID from the request parameters
        const id = req.params.id;

        // Finding the item by its ID
        const item = await Model.findOne({ where: { id: id } });

        // If item is not found, return a 404 error
        if (!item) {
            return res.status(404).json({ message: `${Model.name} not found` });
        }

        // Returning the found item as JSON response
        return res.status(200).json(item);
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error getting item: ${error}`);
        return res.status(500).json({ message: 'An error occurred while getting the item.' });
    }
}

module.exports = getOneItem;