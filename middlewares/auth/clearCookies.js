import { cookiesConfig } from "../../configs/index.js";

export default async function (req, res, next) {
  const cookies = req?.cookies;
  const cookiesNames = Object.keys(cookies);
  console.log("cookies: ", cookies);
  console.log("cookiesNames: ", cookiesNames);

  if (cookiesNames) {
    console.log("INSIDE!");

    cookiesNames.map((cookie) => {
      console.log("cookie: ", cookie);
      res.clearCookie(cookie);
    });
  }

  // if (conditions) {
  //   console.log("INSIDE!");
  //   await res.clearCookie(
  //     cookiesConfig.accessOptions.name,
  //     cookiesConfig.accessOptions.options
  //   );

  //   await res.clearCookie(
  //     cookiesConfig.refreshOptions.name,
  //     cookiesConfig.refreshOptions.options
  //   );
  // }

  next();
}
