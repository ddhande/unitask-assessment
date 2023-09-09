// jwt.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers.authorization?.split(' ')[1]; // Get the JWT token from the authorization header
    const token = req.cookies.token;
    console.log("token",token)
    if (token) {
      try {
        console.log("token,token")
        const secretKey = process.env.JWT_SECRET; 
        const decodedToken = this.jwtService.verify(token.access_token,{ secret: secretKey }); // Verify and decode the JWT token
        req['user'] = decodedToken; // Attach the decoded token to the request object
        console.log("token,token",req['user'] )
        // You can also fetch user data from the database and attach it to the request if needed
        // const user = await this.authService.validateUsernamePassword(decodedToken.sub);
        // req['user'] = user;

        return next(); // Continue to the next middleware or route handler
      } catch (error) {
        console.error("Token verification error:", error);
        // Handle token verification errors
        throw new UnauthorizedException('Invalid JWT token');
      }
    }

    // Handle cases where no token is provided
    throw new UnauthorizedException('JWT token is missing');
  }
}


