import {createConnection, getConnection} from "typeorm";
import log from "../logger";

export class dbConnection{
    private static instance: dbConnection;

    private constructor(){}

    public async createConnection(){
        try{
            await createConnection();
            log.info("Connected to database.");
        }catch(e){
            log.error(e); 
        }
    }


    public static getInstance(): dbConnection {
        if (!dbConnection.instance) {
            dbConnection.instance = new dbConnection();
        }

        return dbConnection.instance;
    }

    public getDBConnection(){
        return getConnection();
    }
}