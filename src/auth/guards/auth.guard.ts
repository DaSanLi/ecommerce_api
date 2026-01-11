import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from "@nestjs/jwt";
import { payloadType, RequestWithUser } from "../utilities/types";
import { jwtConstants } from "../JWT/constant";
import { User } from "../../user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const request = ctx.getContext<{ req: RequestWithUser }>().req;
        const token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException("No se ha proporcionado el token");
        }


        try {
            const payload: payloadType = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            const user = await this.userRepository.findOneBy({ username: payload.username });
            if (!user) {
                throw new UnauthorizedException("Usuario no encontrado");
            }
            request.user = { id: user.id, username: user.username };
        } catch {
            throw new UnauthorizedException("Token no valido");
        }

        return true;
    }
}