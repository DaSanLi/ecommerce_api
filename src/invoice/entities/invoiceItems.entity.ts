import { Field, Float, ID, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class InvoiceItems {   

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID, { description: 'Identifica transacción con un identificador que referencia la compra' })
    id: string;

    @Column()
    @Field( () => Int, { description: "describe la cantidad de productos facturados" } )
    quantity: number

    @Column()
    @Field( () => Float, { description: "Especifica el precio" } )
    price: number

    @ManyToOne( () => Product, (product) => product.invoicesItems )
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne( () => Invoice, (invoice) => invoice.createdAt )
    @JoinColumn({ name: 'invoiceId' })
    invoice: Invoice;
}