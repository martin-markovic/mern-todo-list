import { expect } from "chai";
import request from "supertest";
import mockApp from "../../mocks/backend/mockServer.js";
import mockDB from "../../mocks/backend/config/mockDB.js";
import mockUserRoutes from "../../mocks/backend/routes/users/mockUserRoutes.js";

describe("Route API", () => {
  let app;
  let newUser = mockDB.storage.users[0];
  let mockToken = mockDB.storage.users[0].token;

  before(() => {
    app = mockApp();
    app.listen(4001, () => {
      console.log("Test server running on port 4001");
    });

    app.use("/api/users/", mockUserRoutes);
  });

  describe("User Routes", () => {
    it("should return status 201 and user credentials", async () => {
      const res = await request(app)
        .post("/api/users/")
        .send({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          password2: newUser.password2,
        })
        .set("Authorization", `Bearer ${mockToken}`);

      console.log(`Response user id: ${res.body.id}`);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id", newUser.id);
      expect(res.body).to.have.property("name", newUser.name);
      expect(res.body).to.have.property("email", newUser.email);
      expect(res.body).to.have.property("token", newUser.token);
    });
    // implement token check
  });

  it("should return status 200 and user credentials", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: newUser.email, password: newUser.password })
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id", newUser.id);
    expect(res.body).to.have.property("name", newUser.name);
    expect(res.body).to.have.property("email", newUser.email);
    expect(res.body).to.have.property("token", newUser.token);
  });
});
