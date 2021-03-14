const client = require("./../client");

let managedData = {};

function manageData(dataId) {
  let users = client.retrieveUsers(); //Will return an array of strings. For example: a list of user names
  let user = client.retrieveCurrentUser(); //Will return a string. For example: one user name
  let userIsPresentInList = users.includes(user); //Check if the user is present in a broader user list
  if(userIsPresentInList) {
    managedData[dataId] = client.retrieveDataWithId(dataId);
  }
}


function unmanageData(dataId) {
  client.doSomethingToTheDataWithId(dataId)
  delete managedData[dataId]
}

module.exports = { 
  manageData,
  unmanageData
}

