import {createConnection} from "typeorm";
import log from "../logger";

export default function connectDB(){
    try{
        createConnection();
        log.info("Connected to database.");
    }catch(e){
        log.error(e);
    }
}