const service = require("./service");
const client = require("./../client");
jest.mock("./../client");

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Sucesful management', () => {

    beforeEach(() => {
        service.isUserPresentInUsersList = jest.fn(() => true);
    })

    afterEach(() => {
      service.isUserPresentInUsersList.mockRestore();
    })

    it("Should retrieve the data when user belongs to the user list", async () => {
        //Act
        service.manageData("D");
        //Assert
        expect(client.retrieveDataWithId).toHaveBeenCalledWith("D");
      });
    
      it("Should retrieve the data when user belongs to the user list", async () => {
        //Act
        service.manageData("D");
        service.unmanageData("D");
        //Assert
        expect(client.doSomethingToTheDataWithId).toHaveBeenCalledWith("D");
      });
})

describe("Unsucesful management", () => {
  it("Should not retrieve data when the user 'x' does not belong to the user list ['a', 'b', 'c']", async () => {
    //Arrange
    client.retrieveUsers = jest.fn(() => ["a", "b", "c"]);
    client.retrieveCurrentUser = jest.fn(() => "x");
    //Act
    service.manageData("D");
    //Assert
    expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0);
  });

  it("Should not retrieve data when the user 'x' does not belong to the user list ['a', 'b', 'c']", async () => {
    //Arrange
    client.retrieveInformation1 = jest.fn(() => []);
    client.retrieveInformation2 = jest.fn(() => "x");
    //Act
    service.manageData("D");
    //Assert
    expect(client.retrieveDataWithId).toHaveBeenCalledTimes(0);
  });
});
