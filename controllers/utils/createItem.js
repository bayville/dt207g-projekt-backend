const createItem = async (Model, itemInfo, req, res, ) => {
    try {
        // Creating a new object entry in the database
        const item = await Model.create(itemInfo);

        // Returning the newly created item as JSON response
        return res.status(201).json(item);
    } catch (error) {
        // Handling errors and sending a 500 status code with an error message
        console.error(`Error adding ${Model.name}:`, error);
        return res.status(500).json({ message: `An error occurred while adding the ${Model.name}.` });
    }
}

module.exports = createItem;
