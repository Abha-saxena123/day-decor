import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const BASE_URL = publicRuntimeConfig.apiUrl;

export const API_CONSTANT = {
  USERS: "/users",
  DREAM_LIST: "/dream/list",
  DREAM: "/dream",
  UPDATE: "/dream/update",
  LOGIN: "/login",
};

export const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
      refetchIntervalInBackground: false,
      suspense: false,
      keepPreviousData: false,
    },
    mutations: {
      retry: false,
    },
  },
};
