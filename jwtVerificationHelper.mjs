import jwt from 'jsonwebtoken';
import fs from 'fs';

export const verifyJWT = async (token) => {
    try{
        let  publicKey = fs.readFileSync('publicKey.pem');
        let parsedToken = await jwt.verify(token, publicKey, { algorithms: 'RS256', issuer: 'https://<auth-server-api-id>.execute-api.us-east-1.amazonaws.com' });
        console.log("Parsed Token ", parsedToken);
        return {
            isValid: true,
            clientId: parsedToken.client_id,
            scope: parsedToken.scope
        }
    }
    catch(err){
        console.error(err);
        return {isValid: false};
    }
}