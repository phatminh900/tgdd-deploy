import app from "./src/app.js";
import log from "./src/utils/logger.js";
import connect from "./src/utils/connect.js";
// import routes from "./src/routesMiddleware.js";
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
const port = process.env.PORT || 4000;
const server = connect().then(() => {
  return app.listen(port, () => {
    log.info(`App running at port ${port}`);
    // connect();
    // routes(app);
  });
});
process.on("unhandledRejection", async (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  (await server).close(() => {
    process.exit(1);
  });
});
//# sourceMappingURL=server.js.map
