let whitelistUrls: string[] = [];

if (process.env.FRONT_URL && process.env.FRONTEND_URL) {
  whitelistUrls =
    process.env.FRONTEND_URL.split(',').map((url) =>
      url.endsWith('/') ? url.slice(0, -1) : url,
    ) ?? [];
}

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) {
    const normalizedOrigin =
      origin && origin.endsWith('/') ? origin.slice(0, -1) : origin;

    if (!normalizedOrigin || whitelistUrls.indexOf(normalizedOrigin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
