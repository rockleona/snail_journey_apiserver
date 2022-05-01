import { Router } from "https://deno.land/x/oak/mod.ts";
import { LoginHandler, RegisterHandler } from './controller/usercheck.ts'

export const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .post("/login", LoginHandler)
    .post("/register", RegisterHandler)
    .get("/user", (context) => {
        context.response.body = "Hello /user!";
    })
    .post("/user", (context) => {
        console.log(context);
        context.response.body = "Respond from POST /user!";
    })
    .get("/daily", (context) => {
        context.response.body = "Hello /daily!";
    })
    .get("/get_msg", (context) => {
        context.response.body = "Hello /get_msg!";
    });
