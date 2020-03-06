import configuration from "./configuration.json";
import moment from "moment";

const authorize = () => {
  window.location.href = `https://app.vssps.visualstudio.com/oauth2/authorize?client_id=${configuration.client_id}&response_type=Assertion&state=token&scope=${configuration.scope}&redirect_uri=${window.location.href}`;
};

const getCode = () => {
  const url = new URL(window.location.href);
  let code = url.searchParams.get("code");

  if (code) sessionStorage.setItem("azCode", code);
  else authorize();

  return code;
};

export const getToken = async () => {
  const storedCode = sessionStorage.getItem("azCode");
  const storedToken = sessionStorage.getItem("azToken");
  const storedRefreshDate = sessionStorage.getItem("azRefreshDate");

  if (
    storedToken &&
    storedRefreshDate &&
    moment().isBefore(moment(storedRefreshDate))
  )
    return storedToken;

  const code = storedCode ? storedCode : getCode();

  if (code) {
    const refreshToken =
      storedToken &&
      storedRefreshDate &&
      moment().isAfter(moment(storedRefreshDate))
        ? storedToken
        : null;

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = `\
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer\
&client_assertion=${configuration.client_secret}\
&grant_type=${
      refreshToken
        ? "refresh_token"
        : "urn:ietf:params:oauth:grant-type:jwt-bearer"
    }\
&assertion=${refreshToken ? refreshToken : code}\
&redirect_uri=https://${window.location.hostname}:${window.location.port}/\
`;

    const tokenResponse = await fetch(
      "https://app.vssps.visualstudio.com/oauth2/token",
      { method: "POST", headers, body }
    );
    const token = await tokenResponse.json();

    console.log(token);
    if (token.access_token) {
      sessionStorage.setItem("azToken", token.access_token);
      sessionStorage.setItem(
        "azRefreshDate",
        moment()
          .add(token.expires_in - 60, "seconds")
          .format()
      );
      return token.access_token;
    }
  }

  return sessionStorage.getItem("azToken");
};

export const getHeaders = async () => {
  const token = await getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return headers;
};
