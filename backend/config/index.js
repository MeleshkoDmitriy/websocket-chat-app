export const CONFIG = {
  SERVER: {
    PORT: process.env.PORT || 5000,
    CORS: {
      ORIGIN: "*",
      METHODS: ["GET", "POST"],
    },
  },
  SOCKET: {
    CORS: { origin: "*", methods: ["GET", "POST"] },
  },
};
