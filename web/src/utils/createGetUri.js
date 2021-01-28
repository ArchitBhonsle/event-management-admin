import { API_URI } from "./constants";

export default function createGetUri(url, params) {
  const paramsString = params.map(([key, val]) => key + "=" + val).join("&");
  return API_URI + url + "?" + paramsString;
}
