const client = require("./../client");

let managedData = {};

function manageData(dataId) {
  let users = client.retrieveUsers(); //Will return an array of strings. For example: a list of user names
  let user = client.retrieveCurrentUser(); //Will return a string. For example: one user name
  if(module.exports.isUserPresentInUsersList(user, users)) {
    managedData[dataId] = client.retrieveDataWithId(dataId);
  }
}


function unmanageData(dataId) {
  client.doSomethingToTheDataWithId(dataId)
  delete managedData[dataId]
}

function isUserPresentInUsersList(user, users) {
  return users.includes(user);
}

module.exports = { 
  manageData,
  unmanageData,
  isUserPresentInUsersList
}

