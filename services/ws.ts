import RTLayerClient from "rtlayer-client";

const client = RTLayerClient(`708ef458-adbd-43e8-982d-336571722f17`, `eb6bdd06-54c4-46de-aa67-77397e4beb58`);
client.on("connect", () => {
    console.log("Connected");
});
client.on('message', (message) => {
    console.log("MESSAGE", message);
});


export default client;