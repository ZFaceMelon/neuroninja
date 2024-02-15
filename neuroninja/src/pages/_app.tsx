import { type AppType } from "next/app";

import { api } from "zane/utils/api";

import "zane/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
