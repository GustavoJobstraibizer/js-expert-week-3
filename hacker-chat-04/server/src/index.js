import Event from "events";
import { constants } from "./constants.js";
import Controller from "./controller.js";
import SocketServer from "./socket.js";

const eventEmitter = new Event();

const port = process.env.PORT || 9898;
const socketServer = new SocketServer({ port });
const server = await socketServer.initialize(eventEmitter);
console.log("running...", server.address().port);

const controller = new Controller({ socketServer });
eventEmitter.on(
  constants.event.NEW_USER_CONNECTED,
  controller.onNewConnection.bind(controller)
);

// eventEmitter.on(constants.event.NEW_USER_CONNECTED, (socket) => {
//   console.log("new connection!!!", socket.id);
//   socket.on("data", (data) => {
//     console.log("server received", data.toString());
//     socket.write("World!");
//   });
// });

// await testServer();
