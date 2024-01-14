import request from "supertest";
import {
  address,
  registerBody,
  loginBody,
  newDataForPatch,
  newDataLogin,
  invalidRegisterBody,
} from "../data.js";
import { expect } from "chai";

describe("Test Auth API", function () {
  beforeEach(async function () {
    if (
      this.currentTest.title === "Creates new user successfully" ||
      this.currentTest.title === "Returns token after register" ||
      this.currentTest.title ===
        "Fails registeration if body doesn't contain email"
    ) {
      // Skip user creation for a specific test
      console.log("Skipping user creation for Specific Test Case");
      return;
    }
    await request(address)
      .post("/api/v1/users")
      // .set("Accept", "application/json")
      .send(registerBody);
  });
  // Deletes user created
  afterEach(async () => {
    const response = await request(address)
      .delete("/api/v1/all-users")
      // .set("Accept", "application/json")
      .send({ key_admin: "keyadmin123" });
    expect(response.status).equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("Users deleted with success");
  });

  it("Creates new user successfully", async () => {
    const response = await request(address)
      .post("/api/v1/users")
      // .set("Accept", "application/json")
      .send(registerBody);
    expect(response.status).equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("User registered with success");
  });

  it("Logins successfully", async () => {
    const response = await request(address)
      .post("/api/v1/auth")
      // .set("Accept", "application/json")
      .send(loginBody);
    expect(response.status).equal(200);
    expect(response.body).to.have.property("token");
  });

  it("Deletes user Successfully", async () => {
    const token = await loginUser(loginBody);

    const response = await request(address)
      .delete("/api/v1/users")
      // .set("Accept", "application/json")
      .set("Authorization", token);

    expect(response.status).equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("User deleted with success!");

    const responseLogin = await request(address)
      .post("/api/v1/auth")
      // .set("Accept", "application/json")
      .send(loginBody);
    expect(responseLogin.status).equal(401);
  });

  it("Gets user's data by token", async () => {
    const token = await loginUser(loginBody);

    const response = await request(address)
      .get("/api/v1/users")
      // .set("Accept", "application/json")
      .set("Authorization", token);
    expect(response.status).equal(200);
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("name");
    expect(response.body).to.have.property("email");
    expect(response.body.email).equal(loginBody.email);

    expect(response.body).to.have.property("password");
    expect(response.body.password).equal(loginBody.password);

    expect(response.body).to.have.property("imageUrl");
  });

  it("Patches user's data", async () => {
    var token = await loginUser(loginBody);

    const response = await request(address)
      .patch("/api/v1/users")
      // .set("Accept", "application/json")
      .set("Authorization", token)
      .send(newDataForPatch);
    expect(response.status).equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("User updated with success!");
    token = await loginUser(newDataLogin);
    const responsePatch = await request(address)
      .get("/api/v1/users")
      // .set("Accept", "application/json")
      .set("Authorization", token);
    expect(responsePatch.status).equal(200);
    expect(responsePatch.body).to.have.property("id");
    expect(responsePatch.body).to.have.property("name");
    expect(responsePatch.body).to.have.property("email");
    expect(responsePatch.body.email).equal(newDataForPatch.email);

    expect(responsePatch.body).to.have.property("password");
    expect(responsePatch.body.password).equal(newDataForPatch.password);

    expect(responsePatch.body).to.have.property("imageUrl");
  });

  it("Creates new user with already existing email", async () => {
    //The before each hook already created the user, so we will use the same credentials
    const response = await request(address)
      .post("/api/v1/users")
      // .set("Accept", "application/json")
      .send(registerBody);
    expect(response.status).equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("User already registered");
  });

  it("Returns token after register", async () => {
    const response = await request(address)
      .post("/api/v1/users")
      // .set("Accept", "application/json")
      .send(registerBody);
    expect(response.status).equal(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("User registered with success");
    expect(response.body).to.have.property("token");
  });

  it("Fails registeration if body doesn't contain email", async () => {
    const response = await request(address)
      .post("/api/v1/users")
      // .set("Accept", "application/json")
      .send(invalidRegisterBody);
    expect(response.status).equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).not.equal("User registered with success");
  });

  it("Gets user with empty/token field", async () => {
    const response = await request(address)
      .get("/api/v1/users")
      // .set("Accept", "application/json")
      .set("Authorization", "");

    expect(response.status).equal(403);
    expect(response.body).to.have.property("message");
    expect(response.body.message).equal("Unauthorized");
  });
});

async function loginUser(loginData) {
  const {
    body: { token },
  } = await request(address)
    .post("/api/v1/auth")
    // .set("Accept", "application/json")
    .send(loginData);
  return token;
}
