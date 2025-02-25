import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCities, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { EventEmitter } from "events";

EventEmitter.setMaxListeners(25);

suite("City Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.cityStore.deleteAllCities();
    for (let i = 0; i < testCities.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCities[i] = await db.cityStore.addCity(testCities[i]);
    }
  });

  test("create a city", async () => {
    const city = await db.cityStore.addCity(mozart);
    assertSubset(mozart, city);
    assert.isDefined(city._id);
  });

  test("delete all cities", async () => {
    let returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, 3);
    await db.cityStore.deleteAllCities();
    returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, 0);
  });

  test("get a city - success", async () => {
    const city = await db.cityStore.addCity(mozart);
    const returnedCity = await db.cityStore.getCityById(city._id);
    assertSubset(mozart, city);
  });

  test("delete One City - success", async () => {
    const id = testCities[0]._id;
    await db.cityStore.deleteCityById(id);
    const returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, testCities.length - 1);
    const deletedCity = await db.cityStore.getCityById(id);
    assert.isNull(deletedCity);
  });

  test("get a city - bad params", async () => {
    assert.isNull(await db.cityStore.getCityById(""));
    assert.isNull(await db.cityStore.getCityById());
  });

  test("delete One city - fail", async () => {
    await db.cityStore.deleteCityById("bad-id");
    const allCities = await db.cityStore.getAllCities();
    assert.equal(testCities.length, allCities.length);
  });
});
