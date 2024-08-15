import MockAdapter from "axios-mock-adapter";
import { api } from "../../utils/axios-instance/axios-instance";
import {
  createParty,
  getAverage,
  getDistributions,
  resetParty,
  toggleAdmin,
  toggleDistribution,
} from "./party";
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

  describe("toggleAdmin", () => {
    it("ok: should toggle the admin", async () => {
      const data = { message: "Admin toggled" };
      mock.onPut("/party/toggle-admin").reply(200, data);

      const response = await toggleAdmin("1", "2");

      expect(response).toEqual(data);
    });

    it("error: should handle errors", async () => {
      mock.onPut("/party/toggle-admin").reply(500);

      await toggleAdmin("1", "2");

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error cambiando el admin"
      );
    });
  });

  describe("getDistributions", () => {
    it("ok: should get the distributions", async () => {
      const data = { distributions: ["1", "2"] };
      mock.onGet("/party/distributions").reply(200, data);

      const response = await getDistributions();

      expect(response).toEqual(data);
    });

    it("error: should handle errors", async () => {
      mock.onGet("/party/distributions").reply(500);

      await getDistributions();

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error obteniendo las distribuciones"
      );
    });
  });

  describe("toggleDistribution", () => {
    it("ok: should toggle the distribution", async () => {
      const data = { message: "Distribution toggled" };
      mock.onPut("/party/toggle-distribution").reply(200, data);

      const response = await toggleDistribution("1", "2");

      expect(response).toEqual(data);
    });

    it("error: should handle errors", async () => {
      mock.onPut("/party/toggle-distribution").reply(500);

      await toggleDistribution("1", "2");

      expect(handleError).toHaveBeenCalledWith(
        "Ocurrió un error cambiando la distribución"
      );
    });
  });
});
