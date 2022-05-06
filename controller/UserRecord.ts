import { isMissing } from "./valuecheck.ts";
// import { UserTable, RecordTable } from "./../dbconnector.ts";

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
  if (isMissing(value.username) || isMissing(value.password)) {
    response.body = { msg: "Request body error" };
    response.status = 400;
    return;
  } else {
    response.status = 200;
    return;
  }
};

export const WriteRecordHandler = ({
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
  // const body = request.body();
  // const headers = request.headers();
  // console.log(headers)
  // const value = await body.value;
  console.log(typeof request.headers.authorization)
  console.log(request.headers.authorization)
  response.body = { msg: "Query now" };
  response.status = 200;
//   if (isMissing(value.username) || isMissing(value.password)) {
//     response.body = { msg: "Request body error" };
//     response.status = 400;
//     return;
//   } else {
//     response.status = 200;
//     return;
//   }
};
