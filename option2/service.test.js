const service = require("./service");
const client = require("./../client");
jest.mock("./../client");

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Sucesful management', () => {

    beforeEach(() => {
        client.retrieveUsers = jest.fn(() => ["a", "b", "c"]);
        client.retrieveCurrentUser = jest.fn(() => "a");
    })
    it("Trying to manage data when the user belongs to the user list, should lead to retrieving the data", async () => {
        //Act
        service.manageData("D");
        //Assert
        expect(client.retrieveDataWithId).toHaveBeenCalledWith("D");
      });
    
      it("Trying to unmanage data when the user belongs to the user list, should lead to retrieving the data", async () => {
        //Act
        service.manageData("D");
        service.unmanageData("D");
        //Assert
        expect(client.doSomethingToTheDataWithId).toHaveBeenCalledWith("D");
      });
})

describe("Unsucesful management", () => {
  it("Trying to manage data when the user 'x' does not belong to the user list ['a', 'b', 'c'], should lead to not retrieving the data", async () => {
    //Arrange
    client.retrieveUsers = jest.fn(() => ["a", "b", "c"]);
    client.retrieveCurrentUser = jest.fn(() => "x");
    //Act
    service.manageData("D");
    //Assert
    expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0);
  });

  it("Trying to manage data when the user 'x' does not belong to the user list [], should lead to not retrieving the data", async () => {
    //Arrange
    client.retrieveUsers = jest.fn(() => []);
    client.retrieveCurrentUser = jest.fn(() => "x");
    //Act
    service.manageData("D");
    //Assert
    expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0);
  });
});
