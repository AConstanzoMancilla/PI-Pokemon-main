const { getAllTypes } = require("../controllers//typesControllers")


// 📍 GET | /types
const getAllTypesHandler = async (req, res) => {

    try {
        const response = await getAllTypes();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllTypesHandler
}