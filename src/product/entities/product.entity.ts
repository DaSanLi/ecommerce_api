import { ObjectType, Field, ID } from '@nestjs/graphql';
import { productAvailability } from '../types/types';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType({ description: 'Describe cada producto con su nombre, disponibilidad y cantidad' })
export class Product {

  @PrimaryGeneratedColumn('uuid')
  @Field( ()=> ID, { description: 'Identifica el producto con un identificador' })
  id: string;

  @Column({ type: 'varchar', length: '50' })
  @Field({ description: 'Nombre de producto' })
  name: string;

  @Column({ type: 'int' })
  @Field({ description: 'Cantidad de producto' })
  quantity: number;

  @Column({ type: 'enum', enum: productAvailability })
  @Field({ description: 'Disponibilidad del producto' })
  availability: productAvailability;

  @Column({ type: 'text', nullable: true })
  @Field({ description: 'Descripción del producto', nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
