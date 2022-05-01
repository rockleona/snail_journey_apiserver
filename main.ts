import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { router } from './router.ts';
import { SqlLiter } from './dbconnector.ts';

export const dbContainer = new SqlLiter();
dbContainer.initDB();

const app = new Application();
app.use(oakCors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));
app.use(router.routes());
app.use(router.allowedMethods());

console.log("? Deno start !");
await app.listen({ port: 8000 });