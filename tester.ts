import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";
// const privateKey = ''

export const tokenGen = () => {
  const unsecuredJwt = new jose.UnsecuredJWT({ "urn:example:claim": true })
    .setIssuedAt()
    .setIssuer("snail-journey")
    .setAudience("snail-journey-players")
    .setExpirationTime("2h")
    .encode();
  console.log(unsecuredJwt);
  return unsecuredJwt;
};

export const tokenDec = (jwtPayload : string) =>{
    const payload = jose.UnsecuredJWT.decode(jwtPayload, {
        issuer: "snail-journey",
        audience: "snail-journey-players"
    });
    console.log(payload);
    console.log(payload.payload['urn:example:claim']);
}

const jwt = tokenGen();
tokenDec(jwt);