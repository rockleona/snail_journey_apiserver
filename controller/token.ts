import * as jose from "https://deno.land/x/jose@v4.8.1/index.ts";

export const tokenGen = (payload:any) => {
  const unsecuredJwt = new jose.UnsecuredJWT(payload)
    .setIssuedAt()
    .setIssuer("snail-journey")
    .setAudience("snail-journey-players")
    .setExpirationTime("2h")
    .encode();
    
  return unsecuredJwt;
};

export const tokenDec = (jwtPayload : string) =>{

    const time = Date.now();
    const payload = jose.UnsecuredJWT.decode(jwtPayload, {
        issuer: "snail-journey",
        audience: "snail-journey-players"
    });
    
    const expired = payload?.payload['exp'];
    if (expired != undefined && time > expired) {
        return false;
    }

    return payload;
}
