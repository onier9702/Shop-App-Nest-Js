import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductService,
  ) {}
  
  async seed() {

    await this.deleteTables();
    await this.insertProducts();
    return 'SEED executed';
  }

  async deleteTables() {
    await this.productService.deleteAllTables()
  }

  async insertProducts() {
    const seedProducts = initialData.products;
    let insertPromises = [];
    seedProducts.forEach( prod => {
      this.productService.create( prod );
    } );

    await Promise.all( insertPromises );
    return true;

  }


}
