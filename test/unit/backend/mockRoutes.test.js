import { expect } from "chai";
import request from "supertest";
import mockApp from "../../mocks/backend/mockServer.js";
import mockDB from "../../mocks/backend/config/mockDB.js";
import mockUserRoutes from "../../mocks/backend/routes/users/mockUserRoutes.js";
import mockGoalRoutes from "../../mocks/backend/routes/goals/mockGoalRoutes.js";

describe("Route API", () => {
  let app;
  let newUser = mockDB.storage.users[0];
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

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id", newUser.id);
      expect(res.body).to.have.property("name", newUser.name);
      expect(res.body).to.have.property("email", newUser.email);
      expect(res.body).to.have.property("token", newUser.token);
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

  describe("Goal Routes", () => {
    describe("addGoal", () => {
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
      // it("should respond with 401 status and message", async () => {
      //   const res = await request(app)
      //     .post(`/api/goals/`)
      //     .send({
      //       text: null,
      //       isCompleted: true,
      //     })
      //     .set("Authorization", `Bearer ${mockToken}`);

      //   expect(res.status).to.equal(401);
      //   expect(res.body).to.have.property("message", "Please add all fields");
      // });

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

    describe("getGoals", () => {
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

    describe("getGoalById", () => {
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

    describe("updateGoal", () => {
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

    describe("deleteGoal", () => {
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
