import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCities, testPoes, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poe Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.cityStore.deleteAllCities();
    await db.poeStore.deleteAllPoes();
    beethovenList = await db.cityStore.addCity(beethoven);
    for (let i = 0; i < testPoes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPoes[i] = await db.poeStore.addPoe(beethovenList._id, testPoes[i]);
    }
  });

  test("create single poe", async () => {
    const mozartList = await db.cityStore.addCity(mozart);
    const poe = await db.poeStore.addPoe(mozartList._id, concerto)
    assert.isNotNull(poe._id);
    assertSubset (concerto, poe);
  });

  test("create multiple poes", async () => {
    const poes = await db.cityStore.getCityById(beethovenList._id);
    assert.equal(testPoes.length, testPoes.length)
  });

  test("delete all poes", async () => {
    const poes = await db.poeStore.getAllPoes();
    assert.equal(testPoes.length, poes.length);
    await db.poeStore.deleteAllPoes();
    const newPoes = await db.poeStore.getAllPoes();
    assert.equal(0, newPoes.length);
  });

  test("get a poe - success", async () => {
    const mozartList = await db.cityStore.addCity(mozart);
    const poe = await db.poeStore.addPoe(mozartList._id, concerto)
    const newPoe = await db.poeStore.getPoeById(poe._id);
    assertSubset (concerto, newPoe);
  });

  test("delete One Poe - success", async () => {
    await db.poeStore.deletePoe(testPoes[0]._id);
    const poes = await db.poeStore.getAllPoes();
    assert.equal(poes.length, testCities.length - 1);
    const deletedPoe = await db.poeStore.getPoeById(testPoes[0]._id);
    assert.isNull(deletedPoe);
  });

  test("get a poe - bad params", async () => {
    assert.isNull(await db.poeStore.getPoeById(""));
    assert.isNull(await db.poeStore.getPoeById());
  });

  test("delete one poe - fail", async () => {
    await db.poeStore.deletePoe("bad-id");
    const poes = await db.poeStore.getAllPoes();
    assert.equal(poes.length, testCities.length);
  });
});
