import { expect } from "chai";
import request from "supertest";
import mockApp from "../../mocks/backend/mockServer.js";

describe("Route API", () => {
  let app;

  before(() => {
    app = mockApp();
    app.listen(4001, () => {
      console.log("Test server running on port 4001");
    });
  });

  describe("Initial route", () => {
    it("should start without errors and log port to the console", async () => {
      const res = await request(app).get("/");

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Hello Test");
    });
  });
});
