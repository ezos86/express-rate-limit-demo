import app from "./app";
import config from "./config";

app.listen(config.port, () => {
    console.log(
        `🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`
    );
});
