import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { invoiceState } from '../utilities/types';
import { InvoiceItems } from './invoiceItems.entity';

@Entity()
@ObjectType()
export class Invoice {

  @PrimaryColumn('uuid')
  @Field(() => ID, { description: 'Identifica la factura con un identificador' })
  id: string;

  @Column({ type:'float'})
  @Field(() => Float, { description: 'Muestra el precio total de la factura' })
  total: number;

  @ManyToMany( () => User, (user) => user.buyer )
  @JoinColumn({ name: 'buyerId' })
  @Field(() => String, { description: 'Identifica el comprador con su identificador' })
  buyer: string;

  @ManyToMany( () => User, (user) => user.seller )
  @JoinColumn({ name: 'sellerId' })
  @Field(() => String, { description: 'Identifica el vendedor con su identificador' })
  seller: string;

  @ManyToOne( () => InvoiceItems, (invoiceItems) => invoiceItems.invoice )
  @JoinColumn({ name: 'invoiceItemsId' })
  // @Field(() => [InvoiceItems], { description: 'Muestra los productos y precio asociados a la factura' })
  invoiceItems: InvoiceItems;

  @Column()
  @Field(() => String, { description: 'Muestra la fecha de referencia' })
  createdAt: Date;

  @Column()
  @Field(() => String, { description: 'Muestra la fecha de referencia' })
  state: invoiceState;

}
