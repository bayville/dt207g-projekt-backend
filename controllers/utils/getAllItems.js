const getAllItems = async (Model, res) => {
    try {
        // Fetching all items from the database using the provided model
        const items = await Model.findAll({});

        // Returning all items as JSON response
        return res.status(200).json(items);
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error getting items from ${Model.name}:`, error);
        return res.status(500).json({ message: `An error occurred while getting the ${Model.name}.` });
    }
}


module.exports = getAllItems;