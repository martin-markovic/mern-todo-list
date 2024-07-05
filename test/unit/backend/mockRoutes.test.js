import { expect } from "chai";
import request from "supertest";
import mockApp from "../../mocks/backend/mockServer.js";
import mockDB from "../../mocks/backend/config/mockDB.js";
import mockUserRoutes from "../../mocks/backend/routes/users/mockUserRoutes.js";
import mockGoalRoutes from "../../mocks/backend/routes/goals/mockGoalRoutes.js";

describe("Route API", () => {
  let app;
  let nonExistingUser = {
    name: "Tim White",
    email: "timwhite@gmail.com",
    password: "password123",
    password2: "password123",
  };
  let existingUser = mockDB.storage.users[0];
  let unauthorizedUser = mockDB.storage.users[1];
  let newGoal = mockDB.storage.goals[0];
  let updatedGoal = {
    text: "Updated goal",
    isCompleted: false,
  };
  let anotherUserGoal = mockDB.storage.goals[1];
  let mockToken = mockDB.storage.users[0].token;

  before(() => {
    app = mockApp();
    app.listen(4001, () => {
      console.log("Test server running on port 4001");
    });

    app.use("/api/users/", mockUserRoutes);
    app.use("/api/goals/", mockGoalRoutes);
  });

  describe("User Routes", () => {
    describe("registerUser", () => {
      it("should return status 201 and user credentials", async () => {
        const res = await request(app)
          .post("/api/users/")
          .send(nonExistingUser);

        expect(res.status).to.equal(201);

        expect(res.body).to.have.property("name", nonExistingUser.name);
        expect(res.body).to.have.property("email", nonExistingUser.email);
      });

      it("should return a 400 status and a message", async () => {
        const res = await request(app).post("/api/users/").send({
          name: nonExistingUser.name,
          email: nonExistingUser.email,
          password: null,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Please add all fields");
      });

      it("should return a 400 status and a message", async () => {
        const res = await request(app).post("/api/users/").send(existingUser);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "User already exists");
      });
    });

    describe("loginUser", () => {
      it("should return status 200 and user credentials", async () => {
        const res = await request(app)
          .post("/api/users/login")
          .send({ email: existingUser.email, password: existingUser.password })
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", existingUser.id);
        expect(res.body).to.have.property("name", existingUser.name);
        expect(res.body).to.have.property("email", existingUser.email);
        expect(res.body).to.have.property("token", existingUser.token);
      });

      it("should return a 401 status and a message invalid credentials", async () => {
        const res = await request(app).post("/api/users/login").send({
          name: existingUser.name,
          email: existingUser.email,
          password: "nonexistingpassword",
        });

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Invalid user credentials"
        );
      });
    });
  });

  describe("Goal Routes", () => {
    describe("mockAddGoal", () => {
      it("should create a goal verify it", async () => {
        const res = await request(app)
          .post(`/api/goals/`)
          .send(newGoal)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("user", newGoal.user);
        expect(res.body).to.have.property("text", newGoal.text);
        expect(res.body).to.have.property("isCompleted", newGoal.isCompleted);
      });

      // send request with an empty text field
      it("should respond with 400 status and message", async () => {
        const res = await request(app)
          .post(`/api/goals/`)
          .send({
            text: null,
            isCompleted: true,
          })
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message", "Please add all fields");
      });

      // send request without token
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .post(`/api/goals/`)
          .send(newGoal)
          .set("Authorization", `Bearer ${unauthorizedUser.token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not authorized, no token"
        );
      });
    });

    describe("mockGetGoals", () => {
      it("should get goals and verify them", async () => {
        const res = await request(app)
          .get("/api/goals/")
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("goals").that.is.an("array");
        expect(res.body.goals).to.deep.equal([mockDB.storage.goals[0]]);
      });

      // send request without token
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .get(`/api/goals/${newGoal.id}`)
          .set("Authorization", `Bearer ${unauthorizedUser.token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not authorized, no token"
        );
      });
    });

    describe("mockGetGoalById", () => {
      it("should get a goal by ID and verify it", async () => {
        const res = await request(app)
          .get(`/api/goals/${newGoal.id}`)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", newGoal.id);
        expect(res.body).to.have.property("user", newGoal.user);
        expect(res.body).to.have.property("text", newGoal.text);
        expect(res.body).to.have.property("isCompleted", newGoal.isCompleted);
      });

      // send request to unexisting goal
      it("should respond with 404 status and message", async () => {
        const res = await request(app)
          .get("/api/goals/9999")
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Goal not found");
      });

      // send request without token
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .get(`/api/goals/${newGoal.id}`)
          .set("Authorization", `Bearer ${unauthorizedUser.token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not authorized, no token"
        );
      });

      // send request to another user's goal
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .get(`/api/goals/${anotherUserGoal.id}`)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message", "User not authorized");
      });
    });

    describe("mockUpdateGoal", () => {
      it("should update a goal by ID and verify it", async () => {
        const res = await request(app)
          .put(`/api/goals/${newGoal.id}`)
          .send(updatedGoal)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("user", newGoal.user);
        expect(res.body).to.have.property("text", updatedGoal.text);
        expect(res.body).to.have.property(
          "isCompleted",
          updatedGoal.isCompleted
        );
      });

      // send request to another user's goal ID
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .put(`/api/goals/${anotherUserGoal.id}`)
          .send(updatedGoal)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message", "User not authorized");
      });

      // send request without token
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .put(`/api/goals/${newGoal.id}`)
          .send(updatedGoal)
          .set("Authorization", `Bearer ${unauthorizedUser.token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not authorized, no token"
        );
      });

      // send request to non-existing goal
      it("should respond with 404 status and message", async () => {
        const res = await request(app)
          .put("/api/goals/999")
          .send(updatedGoal)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Goal not found");
      });

      // send request without an updated goal
      it("should respond with 404 status and message", async () => {
        const res = await request(app)
          .put(`/api/goals/${newGoal}`)
          .send({})
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Please add a text field");
      });
    });

    describe("mockDeleteGoal", () => {
      it("should delete a goal by ID and verify it", async () => {
        const res = await request(app)
          .delete(`/api/goals/${newGoal.id}`)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", newGoal.id);
      });

      // send request to another user's goal ID
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .delete(`/api/goals/${anotherUserGoal.id}`)
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("message", "User not authorized");
      });

      // send request without token
      it("should respond with 401 status and message", async () => {
        const res = await request(app)
          .delete(`/api/goals/${newGoal.id}`)
          .set("Authorization", `Bearer ${unauthorizedUser.token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not authorized, no token"
        );
      });

      // send request to non-existing goal
      it("should respond with 404 status and message", async () => {
        const res = await request(app)
          .delete("/api/goals/9999")
          .set("Authorization", `Bearer ${mockToken}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Goal not found");
      });
    });
  });
});
