import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { city2Service } from "./city-service.js";
import { maggie, mozart, testCities, testPoes, concerto } from "../fixtures.js";


suite("Poe API tests", () => {
  let user = null;
  let beethovenSonatas = null;

 
  setup(async () => {
    city2Service.clearAuth();
    user = await city2Service.createUser(maggie);
    await city2Service.authenticate(maggie);
    await city2Service.deleteAllCities();
    await city2Service.deleteAllUsers();
    await city2Service.deleteAllPoes();
    user = await city2Service.createUser(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await city2Service.createCity(mozart);
  });

  teardown(async () => {});

  test("create poe", async () => {
    const returnedPoe = await city2Service.createPoe(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedPoe);
  });

  test("create Multiple poes", async () => {
    for (let i = 0; i < testPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await city2Service.createPoe(beethovenSonatas._id, testPoes[i]);
    }
    const returnedPoes = await city2Service.getAllPoes();
    assert.equal(returnedPoes.length, testPoes.length);
    for (let i = 0; i < returnedPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poe = await city2Service.getPoe(returnedPoes[i]._id);
      assertSubset(poe, returnedPoes[i]);
    }
  });

  test("Delete PoeApi", async () => {
    for (let i = 0; i < testPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await city2Service.createPoe(beethovenSonatas._id, testPoes[i]);
    }
    let returnedPoes = await city2Service.getAllPoes();
    assert.equal(returnedPoes.length, testPoes.length);
    for (let i = 0; i < returnedPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poe = await city2Service.deletePoe(returnedPoes[i]._id);
    }
    returnedPoes = await city2Service.getAllPoes();
    assert.equal(returnedPoes.length, 0);
  });

  test("denormalised city", async () => {
    for (let i = 0; i < testPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await city2Service.createPoe(beethovenSonatas._id, testPoes[i]);
    }
    const returnedCity = await city2Service.getCity(beethovenSonatas._id);
    assert.equal(returnedCity.poes.length, testPoes.length);
    for (let i = 0; i < testPoes.length; i += 1) {
      assertSubset(testPoes[i], returnedCity.tracks[i]);
    }
  });

});
