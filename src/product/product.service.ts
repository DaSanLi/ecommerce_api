import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { generalProductResponse } from './types/types';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductService {


  constructor( 
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}


  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }


  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException(`Producto no encontrado`);
    }
    return product;
  }


  async create(createProductInput: CreateProductDto, userId: string): Promise<generalProductResponse> {
    const duplicado: Product | null = await this.productRepository.findOneBy({ name: createProductInput.name });
    if (duplicado) {
      throw new BadRequestException(`El producto ${createProductInput.name} ya existe`);
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException(`Usuario no encontrado`);
    }
    let newProduct = { ...createProductInput, user: user };
    const savedProduct: Product | null = await this.productRepository.save(newProduct);
    if (!savedProduct) {
      throw new InternalServerErrorException(`El producto no pudo ser creado`);
    }
    return {message: "Producto creado correctamente"};
  }


  async update(taskId: string, UpdateProductDto: UpdateProductDto, userId: string): Promise<generalProductResponse> {
    const user: User|null = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new InternalServerErrorException(`Usuario no encontrado`);
    }
    //verifica que el producto pertenece al usuario
    const products = user.products.find(product => product.id === taskId);
    if (!products) {
      throw new UnauthorizedException(`No tienes permisos suficientes para actualizar este producto`);
    }
    try{
      await this.productRepository.update(taskId, UpdateProductDto);
    }catch(error){
      throw new InternalServerErrorException(`El producto no pudo ser actualizado`);
    }
    return {message: "Producto actualizado correctamente"};
  }


  async remove(taskId: string, userId: string): Promise<generalProductResponse> {
    const user: User|null = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new InternalServerErrorException(`Usuario no encontrado`);
    }
    //verifica que el producto pertenece al usuario
    const products = user.products.find(product => product.id === taskId);
    if (!products) {
      throw new UnauthorizedException(`No tienes permisos suficientes para eliminar este producto o no existe el producto`);
    }
    try{
      await this.productRepository.delete(taskId);
    }catch(error){
      throw new InternalServerErrorException(`El producto no pudo ser eliminado`);
    }
    return {message: "Producto eliminado correctamente"};
  }
}
