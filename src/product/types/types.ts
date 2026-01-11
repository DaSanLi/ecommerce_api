import { Field, ObjectType } from "@nestjs/graphql";

export enum productAvailability {
    disponible = "disponible",
    agotado = "agotado",
    descontinuado = "descontinuado"
}

@ObjectType()
export class generalProductResponse {
    @Field()
    message: string;
}