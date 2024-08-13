import MockAdapter from "axios-mock-adapter";
import { api } from "../../utils/axios-instance/axios-instance";
import { createParty, getAverage, resetParty } from "./party";
import { handleError } from "../../utils/handle-error/handle-error";

jest.mock("../../utils/handle-error/handle-error");
const mock = new MockAdapter(api);

describe("Party Service", () => {
  describe("createParty", () => {
    it("ok: should create a party", async () => {
      const data = { name: "Test Party" };
      mock.onPost("/party").reply(200, data);

      const response = await createParty("Test Party");
      expect(response).toEqual(data);
    });

    it("error: should handle errors", async () => {
      mock.onPost("/party").reply(500);

      await createParty("Test Party");

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error creando la partida"
      );
    });
  });

  describe("getAverage", () => {
    it("ok: should get the average", async () => {
      const data = { average: 5 };
      mock.onGet("/party/average/1").reply(200, data);

      const response = await getAverage("1");

      expect(response).toEqual(data);
    });

    it("error: should handle errors", async () => {
      mock.onGet("/party/average/1").reply(500);

      await getAverage("1");

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error obteniendo el promedio"
      );
    });
  });

  describe("resetParty", () => {
    it("ok: should reset the party", async () => {
      const data = { message: "Party reset" };
      mock.onGet("/party/reset/1").reply(200, data);

      const response = await resetParty("1");

      expect(response).toEqual(data);
    });
    it("error: should handle errors", async () => {
      mock.onGet("/party/reset/1").reply(500);

      await resetParty("1");

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error reiniciando la partida"
      );
    });
  });
});
