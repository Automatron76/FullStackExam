import { assert } from "chai";
import { city2Service } from "./city-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";


const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    city2Service.clearAuth();
    await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    await city2Service.deleteAllUsers();    
     
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await city2Service.createUser(testUsers[i]);
    }
    await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await city2Service.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await city2Service.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await city2Service.deleteAllUsers();
    await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    returnedUsers = await city2Service.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await city2Service.getUser(testUsers[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - deleted user", async () => {
    await city2Service.deleteAllUsers();
    await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    try {
      const returnedUser = await city2Service.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });


  test("get a user - bad id", async () => {
    try {
      const returnedUser = await city2Service.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503)
    }
  });
});



