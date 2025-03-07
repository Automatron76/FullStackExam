import { assert } from "chai";
import { city2Service } from "./city-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    city2Service.clearAuth();
    await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    await city2Service.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await city2Service.createUser(maggie);
    const response = await city2Service.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await city2Service.createUser(maggie);
    const response = await city2Service.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });


  test("check Unauthorized", async () => {
    playtimeService.clearAuth();
    try {
      await playtimeService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

});
