const { where } = require('sequelize');
const modelManager = require('../Models/ModelManager.js')
const Op = modelManager.Sequelize.Op;
const sequalize = modelManager.sequelize;
const { Status } = require('../ResponseClasses/Enum.js')
const { Response } = require('../ResponseClasses/ResponseClasses.js')
const UserService = require('../Services/UserService.js')

const GamePlay = modelManager.GamePlay;

const UpdateGamePlayStats = async (body, res) => {
    console.log("game play stats");
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        await GamePlay.create(body.data);
        var data = {
            score: body.data.score,
            coins: body.data.coins,
            gameResult: body.data.gameResult,
            playerId: body.data.playerId
        }
        await UserService.UpdateUserStats(data);
        res.json(response);
    }
    catch (ex) {
        response.statusCode = Status.Failed;
        response.message = "Failed";
        res.json(response);
    }
}

const GamePlayData = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var result = await GamePlay.findAll({
            attributes: ['id', 'score', 'gameType', 'gameDificulty','gameResult','completlyPlayed'], // Select only these columns
            order: [['createdAt', 'DESC']], 
            where:{
                playerId:body.playerId
            }
        })
        response.data = { "gamePlayDatas": result };
        res.json(response);
    }
    catch (ex) {
        console.log(ex);
        SendFailedResponse(res, response);
    }
}

function SendFailedResponse(res, data) {
    data.statusCode = Status.Failed;
    data.message = "Failed";
    res.json(data);
}

module.exports = {
    UpdateGamePlayStats,
    GamePlayData
};