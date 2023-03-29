import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "https://petstore3.swagger.io/api/v3",
});

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const refreshToken = () =>
  AXIOS_INSTANCE.post("/auth/refreshtoken", {
    refreshToken: getRefreshToken(),
  });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  AXIOS_INSTANCE.interceptors.request.use(
    (config: any) => {
      return {
        ...config,
        headers: getToken()
          ? {
              ...config.headers,
              Authorization: `Bearer ${getToken()}`,
            }
          : config.headers,
      };
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel();
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      console.log({ hiba: err });
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;

          localStorage.setItem("accessToken", accessToken);
          AXIOS_INSTANCE.defaults.headers.common["Authorization"] = accessToken;

          return AXIOS_INSTANCE(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
