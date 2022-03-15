import log from "./logger"
import express from 'express'
import config from 'config'
import { dbConnection } from "./db/connectionDB";
import {routesLoader} from "./routes/routesLoader";
import deserializeUser from "./middleWare/deserializeUser";

const port = config.get("server.port") as number;
const host = config.get("server.host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

app.listen(port,host, ()=>{
    log.info(`Server listening at http://${host}:${port}`);

    const db = dbConnection.getInstance();
    db.createConnection();

    routesLoader(app);
});
