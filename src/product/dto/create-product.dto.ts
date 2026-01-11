import { InputType, Field, ID } from '@nestjs/graphql';
import { productAvailability } from '../types/types';

@InputType()
export class CreateProductDto {

  @Field({ description: 'Nombre de producto' })
  name: string;

  @Field({ description: 'Cantidad de producto' })
  quantity: number;

  @Field({ description: 'Disponibilidad del producto' })
  availability: productAvailability;
}
