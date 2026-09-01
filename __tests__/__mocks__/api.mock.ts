import MockAdapter from "axios-mock-adapter";
import { api } from "@services/index";

let adapter: MockAdapter | null = null;

export const getApiMock = (): MockAdapter => {
  if (!adapter) {
    adapter = new MockAdapter(api, { onNoMatch: "throwException" });
  }
  return adapter;
};

export const resetApiMock = (): void => {
  adapter?.reset();
};

export const restoreApiMock = (): void => {
  adapter?.restore();
  adapter = null;
};

export const getRequests = () => getApiMock().history.get;

export const getLastRequest = () => {
  const requests = getRequests();
  return requests[requests.length - 1];
};
