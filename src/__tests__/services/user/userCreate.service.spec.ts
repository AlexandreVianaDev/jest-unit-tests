import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userCreateService from "../../../services/user/userCreate.service";

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

  test("Should insert the information of the new user in the database", async () => {
    const email = "alexandre@mail.com";
    const name = "alexandre";
    const age = 29;

    const userData = { email, name, age };

    const newUser = await userCreateService(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: 1,
        email,
        name,
        age,
      })
    );
  });
});
