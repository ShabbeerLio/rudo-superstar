const { where } = require('sequelize');
const modelManager = require('../../Models/ModelManager.js')
const Op = modelManager.Sequelize.Op;
const { Status } = require('../../ResponseClasses/Enum.js')
const { Response } = require('../../ResponseClasses/ResponseClasses.js')

const Admin = modelManager.Admin;
const User=modelManager.User;

const Login = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var user = await Admin.findOne({ 
            where: 
            { 
                [Op.and]:{
                    userId: body.data.userId,
                    password:body.data.password 
                }
            }
         });
        if (user === null) {
            response.data = null;
            response.message="Invalid userId or password!!";
            response.statusCode=Status.Failed;
            res.json(response);
        } else {
            response.data = user;
            res.json(response);
        }
    }
    catch (ex) {
        SendFailedResponse(res, response);
    }
}

const FetchUser = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var result = await User.findAll({
            attributes: ['id', 'name', 'googleId','active','gender','age','country','state','city','mobileNo','totalScore','totalCoins','totalFriends','totalMatch','totalWin','totalLose','totaldraw','createdAt'], // Select only these columns
            order: [['createdAt', 'DESC']],            // Sort by 'score' in descending order
        })
        response.data = { "users": result };
        res.json(response);
    }
    catch (ex) {
        SendFailedResponse(res, response);
    }
}

const UpdateUser = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var result = await User.update(
            {
                name: body.data.name,
                emailId: body.data.emailId,
                mobileNo: body.data.mobileNo,
                gender: body.data.gender,
                age: body.data.age,
                country: body.data.country,
                state: body.data.state,
                city: body.data.city,
            },
            {
                where: {
                    googleId: body.data.googleId
                },
            },
        );
        if (result == 1)
            res.json(response);
        else {
            SendFailedResponse(res, response);
        }
    }
    catch (ex) {
        SendFailedResponse(res, response);
    }
}

const Leaderboard = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var result = await User.findAll({
            attributes: ['id', 'name', 'totalScore', 'googleImageUrl'], // Select only these columns
            order: [['totalScore', 'DESC']],            // Sort by 'score' in descending order
            limit: 50,                             // Limit the number of rows returned
        })
        response.data = { "lbDatas": result };
        res.json(response);
    }
    catch (ex) {
        SendFailedResponse(res, response);
    }
}


const UpdateUserStats = async (data) => {
    try {
        var user = await User.findOne({ where: { id: data.playerId } });
        if (user != null) {
            user.totalScore += data.score;
            user.totalCoins += data.coins;
            user.totalMatch += 1;

            if (data.gameResult === 'WIN') {
                user.totalWin += 1;
            }
            else if (data.gameResult === 'LOSE') {
                user.totalLose += 1;
            }
            else {
                user.totalDraw += 1;
            }
            await user.save();
            console.log("User Stat Updated Successfully!!");
        } else {
            console.log("User Object is null !!");
        }
    }
    catch (ex) {
        console.log("User Stat Updating Failed " + ex);
        SendFailedResponse(res, response);
    }
}

const UpdateCoins = async (body, res) => {
    var response = new Response();
    try {
        response.requestType = body.requestType;
        response.statusCode = Status.Success;
        response.message = "Success";

        var user = await User.findOne({ where: { id: body.playerId } });
        if (user != null) {
            user.totalCoins += body.data.coins;
            await user.save();
            res.json(response);
        } else {
            console.log("User Object is null !!");
            SendFailedResponse(res, response);
        }
    }
    catch (ex) {
        SendFailedResponse(res, response);
    }
}

function SendFailedResponse(res, data) {
    data.statusCode = Status.Failed;
    data.message = "Failed";
    res.json(data);
}

module.exports = {
    Login,
    UpdateUser,
    Leaderboard,
    UpdateUserStats,
    UpdateCoins,
    FetchUser
};