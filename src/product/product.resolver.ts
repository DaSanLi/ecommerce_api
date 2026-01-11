import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { RequestWithUser } from '../auth/utilities/types';
import { generalProductResponse } from './types/types';


@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'FindAllProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'FindOneProduct' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => generalProductResponse)
  createProduct(@Args('createProductInput') createProductInput: CreateProductDto, @Context('req') req: RequestWithUser) {
    return this.productService.create(createProductInput, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => generalProductResponse)
  updateProduct(@Args('id') id: string, @Args('updateProductInput') updateProductInput: UpdateProductDto, @Context('req') req: RequestWithUser) {
    return this.productService.update(id, updateProductInput, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => generalProductResponse)
  removeProduct(@Args('id') id: string, @Context('req') req: RequestWithUser) {
    return this.productService.remove(id, req.user.id);
  }
}
