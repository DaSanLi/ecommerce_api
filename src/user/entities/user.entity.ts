import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from "../../product/entities/product.entity";

@Entity()
@ObjectType({ description: "Representa un usuario y sus credenciales" })
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: "Identificador unico de usuario" })
    id: string

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    @Field(() => String, { description: "Nombre de usuario" })
    username: string;

    @Column({ type: "varchar", nullable: false })
    @Field(() => String, { description: "Contraseña de usuario" })
    password: string;

    @DeleteDateColumn()
    @Field(() => Date, { nullable: true, description: "Muestra si el usuario ha sido borrado" })
    deletedAt?: Date | null;

    @OneToMany(() => Product, (product) => product.user, {eager: true})
    @Field(() => [Product], { description: 'Muestra aquellos productos creados por el usuario' })
    products: Product[];
}