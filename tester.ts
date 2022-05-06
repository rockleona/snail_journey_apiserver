import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";
// const privateKey = ''

export const tokenGen = () => {
  const unsecuredJwt = new jose.UnsecuredJWT({ "username": "tester" })
    .setIssuedAt()
    .setIssuer("snail-journey")
    .setAudience("snail-journey-players")
    .setExpirationTime("2h")
    .encode();
  console.log(unsecuredJwt);
  return unsecuredJwt;
};

export const tokenDec = (jwtPayload: string) => {
  const payload = jose.UnsecuredJWT.decode(jwtPayload, {
    issuer: "snail-journey",
    audience: "snail-journey-players",
  });
  console.log(payload);
  console.log(payload.payload["urn:example:claim"]);
  
  if(payload.payload["exp"] != undefined){
    const time = new Date( new Date(0).setUTCSeconds(payload.payload["exp"]));
    console.log(time.getTime());
    console.log(Date.now());
  }
};

const jwt = tokenGen();
// const jwt = 'eyJhbGciOiJub25lIn0.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjUxODA4MDYzLCJpc3MiOiJzbmFpbC1qb3VybmV5IiwiYXVkIjoic25haWwtam91cm5leS1wbGF5ZXJzIiwiZXhwIjoxNjUxODE1MjYzfQ.'
tokenDec(jwt);
