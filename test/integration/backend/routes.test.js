import { expect } from "chai";
import request from "supertest";
import http from "http";
import app from "../../../backend/server.js";
import User from "../../../backend/models/userModel.js"; // Adjust the path as needed

let newUser = {
  name: "Test User",
  email: "testuser@example.com",
  password: "password123",
  password2: "password123",
};

describe("Route API", () => {
  let server;

  before((done) => {
    server = http.createServer(app);
    server.listen(4001, done);
  });

  after((done) => {
    server.close(done);
  });

  afterEach(async () => {
    // Clean up the user created during each test
    await User.deleteOne({ email: newUser.email });
  });

  describe("User Routes", () => {
    it("should register a new user", async () => {
      const res = await request(server).post("/api/users/").send(newUser);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", newUser.name);
      expect(res.body).to.have.property("email", newUser.email);
      expect(res.body).to.have.property("token");
    });

    it("should login a user", async () => {
      await request(server).post("/api/users/").send(newUser);

      const res = await request(server).post("/api/users/login").send({
        email: newUser.email,
        password: newUser.password,
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", newUser.name);
      expect(res.body).to.have.property("email", newUser.email);
      expect(res.body).to.have.property("token");
    });
  });
});
