import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { LoginHandler, RegisterHandler } from './controller/UserAccount.ts'
import { GetRecordHandler, WriteRecordHandler } from './controller/UserRecord.ts'

export const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .post("/login", LoginHandler)
    .post("/register", RegisterHandler)
    .get("/user", GetRecordHandler)
    .post("/user", WriteRecordHandler)
    .get("/daily", (context) => {
        context.response.body = "Hello /daily!";
    })
    .post("/daily", (context) => {
        console.log(context);
        context.response.body = "Respond from POST /daily!";
    })
    .post("/submit_msg", (context) => {
        console.log(context);
        context.response.body = "Respond from POST /submit_msg!";
    })
    .get("/get_msg", (context) => {
        context.response.body = "Hello /get_msg!";
    });
