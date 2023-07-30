import { verifyJWT } from './jwtVerificationHelper.mjs';
import { getToken, generatePolicy } from './helpers.mjs';

export const handler = async (event, context, callback) => {
   try{
      console.log(event);
      let token = getToken(event.authorizationToken);
      let verified = await verifyJWT(token);
      console.log(verified);
      if(verified.isValid){
         let policy =  generatePolicy(verified.clientId, 'Allow', verified.scope);
         console.log(JSON.stringify(policy));
         return policy;
      }
      return generatePolicy(verified.clientId, 'Deny', null);
   }
   catch(err){
      console.error(err);
      callback("Unauthorized");
   }
};