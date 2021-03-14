const service = require('./service')
const client = require("./../client");
jest.mock("./../client");

beforeEach(() => {
  jest.clearAllMocks();
})

it("Should not retrieve data when the user 'x' does not belong to the user list ['a', 'b', 'c']", async () => {
    //Arrange
    client.retrieveUsers = jest.fn(() => ['a','b','c'])
    client.retrieveCurrentUser = jest.fn(() => 'a')

    //Act
    service.manageData('D');
    //Assert
    expect(client.retrieveDataWithId).toHaveBeenCalledWith('D')
})

it("Should retrieve the data when user belongs to the user list", async () => {
  //Arrange
  client.retrieveUsers = jest.fn(() => ['a','b','c'])
  client.retrieveCurrentUser = jest.fn(() => 'a')
  //Act
  service.manageData('D');
  service.unmanageData('D');
  //Assert
  expect(client.doSomethingToTheDataWithId).toHaveBeenCalledWith('D')
})

it("Should not retrieve data when the user 'x' does not belong to the user list ['a', 'b', 'c']", async () => {
  //Arrange
  client.retrieveUsers = jest.fn(() => ['a','b','c'])
  client.retrieveCurrentUser = jest.fn(() => 'x')
  //Act
  service.manageData('D');
  //Assert
  expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0)
})

it("Should not retrieve data when the user 'x' does not belong to the user list ['a', 'b', 'c']", async () => {
  //Arrange
  client.retrieveUsers = jest.fn(() => [])
  client.retrieveCurrentUser = jest.fn(() => 'x')
  //Act
  service.manageData('D');
  //Assert
  expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0)
})

