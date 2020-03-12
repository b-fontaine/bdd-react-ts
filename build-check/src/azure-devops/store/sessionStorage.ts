import { Storage } from "./";
import moment from "moment";

const session: Storage = {
  getCode: () => sessionStorage.getItem("azCode") ?? undefined,
  getToken: () => sessionStorage.getItem("azToken") ?? undefined,
  getRefreshDate: () => {
    const value = sessionStorage.getItem("azRefreshDate");

    return value ? moment(value) : undefined;
  },

  setCode: code => {
    sessionStorage.setItem("azCode", code);
  },

  setToken: (token, expires_in) => {
    if (token) {
      sessionStorage.setItem("azToken", token);
      sessionStorage.setItem(
        "azRefreshDate",
        moment()
          .add(expires_in - 60, "seconds")
          .format()
      );
    }
  }
};

export default session;
