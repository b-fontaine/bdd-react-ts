import { getStorage } from './store';
import configuration from './configuration.json';
import moment from 'moment';

const authorize = () => {
  window.location.href = `https://app.vssps.visualstudio.com/oauth2/authorize?client_id=${configuration.client_id}&response_type=Assertion&state=token&scope=${configuration.scope}&redirect_uri=${window.location.href}`;
};

const getCode = async () => {
  const url = new URL(window.location.href);
  let code = url.searchParams.get('code');

  if (code) (await getStorage())?.setCode(code);
  else authorize();

  return code;
};

export const getToken = async () => {
  const storage = await getStorage();
  if (storage) {
    const storedCode = storage.getCode();
    const storedToken = storage.getToken();
    const storedRefreshDate = storage.getRefreshDate();

    if (
      storedToken &&
      storedRefreshDate &&
      moment().isBefore(moment(storedRefreshDate))
    )
      return storedToken;

    const code = storedCode ? storedCode : await getCode();

    if (code) {
      const refreshToken =
        storedToken &&
        storedRefreshDate &&
        moment().isAfter(moment(storedRefreshDate))
          ? storedToken
          : null;

      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const body = `\
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer\
&client_assertion=${configuration.client_secret}\
&grant_type=${
        refreshToken
          ? 'refresh_token'
          : 'urn:ietf:params:oauth:grant-type:jwt-bearer'
      }\
&assertion=${refreshToken ? refreshToken : code}\
&redirect_uri=https://${window.location.hostname}:${window.location.port}/\
`;

      const tokenResponse = await fetch(
        'https://app.vssps.visualstudio.com/oauth2/token',
        { method: 'POST', headers, body }
      );
      const token = await tokenResponse.json();

      console.log(token);
      if (token.access_token) {
        storage.setToken(token.access_token, token.expires_in);
        return token.access_token;
      }
    }

    return storage.getToken();
  } else {
    return undefined;
  }
};

export const getHeaders = async () => {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  return headers;
};
