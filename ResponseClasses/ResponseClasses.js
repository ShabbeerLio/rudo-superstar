const { RequestType,Status } = require("./Enum");

class Response {
  constructor() {
    this.requestType = RequestType.None;
    this.message = "";
    this.statusCode = Status.Success;
    this.data=null
  }
}

module.exports = { 
  Response, 
};
