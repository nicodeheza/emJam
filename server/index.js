const WebSocket = require("ws");
const {v4: uuidv4} = require("uuid");

const {WebSocketServer} = WebSocket;

const wss = new WebSocketServer({port: 8080});

const rooms = {};

wss.on("connection", (ws) => {
	console.log("new connection");
	const userId = uuidv4();

	function leave(room) {
		if (!rooms[room][userId]) {
			return;
		}
		if (Object.keys(rooms[room]).length === 1) {
			delete rooms[room];
		} else {
			delete rooms[room][userId];
			Object.keys(rooms[room]).forEach((user) => {
				rooms[room][user].send(JSON.stringify({status: "userExit", user: userId}));
			});
		}
	}

	//add user to a room
	const roomsKeys = Object.keys(rooms);
	if (roomsKeys.length === 0) {
		const roomId = uuidv4();
		rooms[roomId] = {};
		rooms[roomId][userId] = ws;
		rooms[roomId][userId].send(
			JSON.stringify({status: "connected", room: roomId, users: []})
		);
	} else {
		for (let i = 0; i < roomsKeys.length; i++) {
			const room = roomsKeys[i];

			if (Object.keys(rooms[room]).length < 5) {
				rooms[room][userId] = ws;
				const usersIds = Object.keys(rooms[room]).filter((id) => id !== userId);
				rooms[room][userId].send(
					JSON.stringify({status: "connected", room, users: usersIds})
				);
				usersIds.forEach((id) => {
					rooms[room][id].send(JSON.stringify({status: "newUser", user: userId}));
				});
				break;
			} else if (i === roomsKeys.length - 1) {
				const roomId = uuidv4();
				rooms[roomId] = {};
				rooms[roomId][userId] = ws;
				rooms[roomId][userId].send(
					JSON.stringify({status: "connected", room: roomId, users: []})
				);
			}
		}
	}

	ws.on("close", () => {
		Object.keys(rooms).forEach((room) => leave(room));
		logRoomsAndUsers();
	});

	//console.log(rooms);
	function logRoomsAndUsers() {
		console.log("-----new------------------------------------------------------");
		Object.keys(rooms).forEach((room) => {
			console.log(
				`-----room: ${room}--------------------------------------------------------`
			);
			Object.keys(rooms[room]).forEach((user) => {
				console.log(`user: ${user}`);
			});
		});
	}
	logRoomsAndUsers();

	ws.on("message", (data) => {
		//console.log(JSON.parse(data));
		const messageData = JSON.parse(data);
		console.log(messageData);
		Object.keys(rooms[messageData.room]).forEach((user) => {
			if (user !== userId) {
				rooms[messageData.room][user].send(
					JSON.stringify({status: "message", user: userId, message: messageData.message})
				);
			}
		});
	});
});
