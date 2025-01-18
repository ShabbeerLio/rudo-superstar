const { RequestType } = require("../ResponseClasses/Enum");

const UserService = require("../Services/UserService")
const GamePlayService = require("../Services/GamePlayService")
const ConfigService = require("../Services/ConfigServices")

var gameAPIController = {
    Performtask: (request, response) => {
        console.log(request.body);
        switch (request.body.requestType) {
            case RequestType.Login:
                UserService.Login(request.body, response);
                break;
            case RequestType.UserUpdate:
                UserService.UpdateUser(request.body, response);
                break;
            case RequestType.Leaderboard:
                UserService.Leaderboard(request.body, response);
                break;
            case RequestType.GamePlayStats:
                GamePlayService.UpdateGamePlayStats(request.body, response);
                break;
            case RequestType.GetConfig:
                ConfigService.GetConfig(request.body, response);
                break;
            case RequestType.UpdateUserCoins:
                UserService.UpdateCoins(request.body, response);
                break;
            case RequestType.GamePlayData:
                GamePlayService.GamePlayData(request.body,response);
                break;
        }
    },
};
module.exports = { gameAPIController };
