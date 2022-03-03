import express, {Request, Response} from "express";

export  function createUserHandler(req: Request, res: Response){

    res.send("success");
}