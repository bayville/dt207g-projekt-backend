const updateItem = async (Model, itemInfo, req, res) => {
    try {
        //Extracting the menu ID from the request parameters
        const id = req.params.id;

        //Finding the item by ID
        const item = await Model.findByPk(id);

        //If item is not found, return a 404 error
        if (!item) {
            return res.status(404).json({ success: false, message: `${Model.name} not found` });
        }

        //Updating the item with the new data
        await item.update(itemInfo);

        //Returning a success message along with the updated menu as JSON response
        return res.status(200).json({success: true, message: `${Model.name} updated successfully`, item });
    } catch (error) {
        //Handling errors and sending a 500 status code with an error message
        console.error(`Error updating ${Model.name}:`, error);
        return { success: false, status: 500, message: `An error occurred while updating the ${Model.name}.` };
    }
}

module.exports = updateItem;