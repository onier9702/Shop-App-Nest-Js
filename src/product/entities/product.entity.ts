import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImages } from './product-images.entity';
import { User } from '../../auth/entities/user.entity';


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
    })
    name: string;

    @Column({
        type: 'float',
        default: 1
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'numeric',
        default: 1
    })
    stock: number;

    @Column({ type: 'simple-array'})
    sizes: string[];

    @Column({type: 'text'})
    gender: string;

    @Column({ type: 'simple-array' })
    tags: string[];

    // Relations
    @OneToMany(
        () => ProductImages,
        imageEntity => imageEntity.product,
        { cascade: true, eager: true }
        // OJO: this cascade on TRUE allow me to create a product and automatically insert children relations on DB,
        // I mean: in productsService was used productRepository.save(product) and NOT productImagesRepository.save(url)
        // this cascade on true allow impact on productImagesrepository automatically
    )
    images?: ProductImages[];

    @ManyToOne(
        () => User,
        user => user.products
    )
    user: User;

}