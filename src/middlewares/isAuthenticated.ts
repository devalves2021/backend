import { Request, Response , NextFunction } from 'express'
import { verify} from 'jsonwebtoken'

interface PayLoad{
 sub: string;
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction){
 
 //receber o token
 const authToken = req.headers.authorization;
 if(!authToken){
   return res.status(401).end();
 }
  const [, token] = authToken.split(" ")
 
  try {
     //validando token
     const {sub} = verify(
      token,
      process.env.JWT_SECRET
     ) as PayLoad;

     //recupear o id do token e colocar dentro de uma variavel user_id  dentro req
     req.user_id = sub;

     return next();

  } catch(err){
    return res.status(401).end();
  }
   
}