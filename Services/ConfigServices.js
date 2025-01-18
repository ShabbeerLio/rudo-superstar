const modelManager = require('../Models/ModelManager.js')
const Op = modelManager.Sequelize.Op;
const { Status } = require('../ResponseClasses/Enum.js')
const { Response } = require('../ResponseClasses/ResponseClasses.js')

const Config = modelManager.Config;

const GetConfig = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var config = await Config.findAll({ attributes: ['key', 'value'] });
        if (config === null) {
            response.statusCode = Status.Failed;
            response.message = "Failed";
            res.json(response);
        } else {
            // Transform the data into a dictionary
            const configDictionary = config.reduce((acc, item) => {
                acc[item.key] = item.value; // Map key to value
                return acc;
            }, {});

            response.data ={"configKeyValue":configDictionary} ;
            res.json(response);
        }
    }
    catch (ex) {
        response.statusCode = Status.Failed;
        response.message = "Failed";
        res.json(response);
    }
}

module.exports = {
    GetConfig
};