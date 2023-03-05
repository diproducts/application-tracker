module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3000/api/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};