import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './entities/user.entity'
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.input';
import { CreateUserDto } from './dto/create-user.input';

@Resolver()
export class UsersResolver {


    constructor(private readonly usersService: UsersService) { }


    @Query(() => [User], {description: "Trae todos los usuarios registrados"})
    findAllUsers() {
        return this.usersService.findAllUsers();
    }


    @Query(() => User, {description: "Encuentra un usuario por su identificador"})
    findOneUser(@Args("id") id: string) {
        return this.usersService.findOneUser(id);
    }


    @UsePipes(new ValidationPipe)
    @Mutation(() => User, {description: "Crea un nuevo usuario"})
    createUser(@Args('newUser') newUser: CreateUserDto) {
        return this.usersService.createUser(newUser);
    }

    @UsePipes(new ValidationPipe)
    @Mutation(() => String, {description: "Actualiza las credenciales de un usuario existente"})
    updateUser(@Args('id') id: string, @Args('body') body: UpdateUserDto) {
        return this.usersService.updateUser(id, body);
    }


    @Mutation(() => String, {description: "Borra un usuario de manera blanda"})
    softDeleteUSer(@Args('id') id: string){
        return this.usersService.softDeleteUSer(id);
    }


    @Mutation(() => String, {description: "Cancela el borrado blando de un usuario"})
    cancelSoftDelete(@Args('id') id: string){
        return this.usersService.cancelSoftDelete(id)
    }

}