import { tokenDec } from "./token.ts";
import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";
import { RecordTable } from "./../dbconnector.ts";
// import { UserTable, RecordTable } from "./../dbconnector.ts";

const UserFind = (token: string) => {
  const jwt = token.replace("Bearer ", "");
  const payload: jose.UnsecuredResult | boolean = tokenDec(jwt);
  if (!payload) {
    return false;
  } else {
    return payload;
  }
};

export const GetRecordHandler = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.body = { msg: "No request body" };
    response.status = 400;
  }
  const body = request.body();
  const value = await body.value;
  const headers: Headers = request.headers;
  const token: string | null = headers.get("authorization");
  if (token != null && token.includes("Bearer ")) {
    const identity: jose.UnsecuredResult | boolean = UserFind(token);
    if (!identity) {
      response.body = { msg: "Unauthorized" };
      response.status = 401;
    } else {
      const id: unknown | number = identity.payload["id"];
      const existData: any = await RecordTable.where(
        "usertable_id",
        id as number,
      ).get();
      if (existData.length == 1) {
        const data : any = await RecordTable.where("usertable_id", id as number).get();
        response.body = { msg: "Record Found!", record: data[0].record };
        response.status = 200;
      } else {
        response.body = { msg: "No Data" };
        response.status = 200;
      }
    }
  } else {
    response.body = { msg: "Unauthorized" };
    response.status = 401;
  }
};

export const WriteRecordHandler = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.body = { msg: "No request body" };
    response.status = 400;
  }
  const body = request.body();
  const value = await body.value;
  const headers: Headers = request.headers;
  const token: string | null = headers.get("authorization");
  if (token != null && token.includes("Bearer ")) {
    const identity: jose.UnsecuredResult | boolean = UserFind(token);
    if (!identity) {
      console.log("Identity!")
      
      response.body = { msg: "Unauthorized" };
      response.status = 401;
    } else {
      const id: unknown | number = identity.payload["id"];
      const existData: any = await RecordTable.where(
        "usertable_id",
        id as number,
      ).get();
      if (existData.length == 1) {
        await RecordTable.where("usertable_id", id as number).update({
          record: value.record,
        });
      } else {
        await RecordTable.create(
          {
            record: value.record,
            usertable_id: id as number,
          },
        );
      }
      response.body = { msg: "Record Saved!" };
      response.status = 200;
    }
  } else {
    console.log("Token Null!")
    response.body = { msg: "Unauthorized" };
    response.status = 401;
  }
};
