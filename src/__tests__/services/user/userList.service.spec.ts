import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userListService from "../../../services/user/userList.service";

describe("Create an user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Erro during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should list all registered users", async () => {
    const userList = await userListService();

    expect(userList).toHaveProperty("map");
  });
});
