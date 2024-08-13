import { vote } from "./user";
import { api } from "../../utils/axios-instance/axios-instance";
import { handleError } from "../../utils/handle-error/handle-error";

jest.mock("../../utils/axios-instance/axios-instance");
jest.mock("../../utils/handle-error/handle-error");

describe("vote function", () => {
  const mockVoteData = {
    vote: "upvote",
    roomId: "room123",
    userId: "user456",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when vote is successful", async () => {
    const mockResponse = { data: "success" };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await vote(mockVoteData);

    expect(api.post).toHaveBeenCalledWith("/party/vote", mockVoteData);
    expect(result).toBe(mockResponse.data);
  });

  it("should call handleError when an error occurs", async () => {
    const mockError = new Error("Network Error");
    (api.post as jest.Mock).mockRejectedValue(mockError);

    await vote(mockVoteData);

    expect(api.post).toHaveBeenCalledWith("/party/vote", mockVoteData);
    expect(handleError).toHaveBeenCalledWith("Ocurrió un error al votar");
  });
});
