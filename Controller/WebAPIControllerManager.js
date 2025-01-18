const { WebRequestType } = require("../ResponseClasses/Enum");

const WebUserServices = require("../Services/WebAPI/WebUserServices")
const WebGamePlayService = require("../Services/WebAPI/WebGamePlayService")


var webAPIController = {
    Performtask: (request, response) => {
        console.log(request.body);
        switch (request.body.requestType) {
            case WebRequestType.Login:
                WebUserServices.Login(request.body, response);
                break;
            case WebRequestType.FetchUsers:
                WebUserServices.FetchUser(request.body, response);
                break;
            case WebRequestType.GamePlayDataById:
                WebGamePlayService.GamePlayDataById(request.body, response);
                break;
            case WebRequestType.GamePlayData:
                WebGamePlayService.GamePlayData(request.body, response);
                break;
        }
    },
};
module.exports = { webAPIController };
