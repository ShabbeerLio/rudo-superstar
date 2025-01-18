const Status = {
  Success: 0,
  Failed: 1,
};

const RequestType = {
  None: 0,
  Login: 1,
  UserUpdate:2,
  GamePlayStats:3,
  Leaderboard:4,
  GetConfig:5,
  UpdateUserCoins:6,
  GamePlayData:7,
};

const WebRequestType={
  None:0,
  Login:1,
  FetchUsers:2,
  GamePlayDataById:3,
  GamePlayData:4,
}


module.exports = { Status, RequestType,WebRequestType };
