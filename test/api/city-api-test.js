import { EventEmitter } from "events";
import { assert } from "chai";
import { city2Service } from "./city-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, mozart, testCities } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("City API tests", () => {

  let user = null;
  setup(async () => {
    city2Service.clearAuth();
    user = await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    await city2Service.deleteAllCities();
    await city2Service.deleteAllUsers();
    user = await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await city2Service.createCity(mozart);
  });

  teardown(async () => {});

  test("create city", async () => {
    const returnedCity = await city2Service.createCity(mozart);
    assert.isNotNull(returnedCity);
    assertSubset(mozart, returnedCity);
  });

  test("delete a city", async () => {
    const city = await city2Service.createCity(mozart);
    const response = await city2Service.deleteCity(city._id);
    assert.equal(response.status, 204);
    try {
      const returnedCity = await city2Service.getCity(city.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No City with this id", "Incorrect Response Message");
    }
  });

  test("create multiple cities", async () => {
    for (let i = 0; i < testCities.length; i += 1) {
      testCities[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await city2Service.createCity(testCities[i]);
    }
    let returnedLists = await city2Service.getAllCities();
    assert.equal(returnedLists.length, testCities.length);
    await city2Service.deleteAllCities();
    returnedLists = await city2Service.getAllCities();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant city", async () => {
    try {
      const response = await city2Service.deleteCity("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No City with this id", "Incorrect Response Message");
    }
  });
});
