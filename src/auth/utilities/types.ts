import { Request } from "express";
import { ObjectType, Field } from '@nestjs/graphql';


export interface userResponse {
    username: string;
    password: string;
}


export interface payloadType {
    username: string;
    id: string;
}


export interface RequestWithUser extends Request {
    user: payloadType;
}


@ObjectType()
export class UserClass {
    username: string;
    //solo hay acceso para devolver el token
    @Field({ description: "Representa un token como pase a datos sensibles del usuario relacionado"})
    token: string;
}
