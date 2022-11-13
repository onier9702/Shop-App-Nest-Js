import { text } from "stream/consumers";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../product/entities/product.entity';
import { ListOfValidRoles } from "../interfaces/roles";
// import { Login } from './login.entity';


@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    uid: number;
    
    @Column()
    name: string;

    @Column( { type: 'text' } )    
    lastname: string;

    @Column( { type: 'text' } )
    email: string;

    @Column( { type: 'text' } )    
    password: string;

    @Column( { type: 'text' } )
    mobile: string;

    @Column( { type: 'simple-array' , default: [ListOfValidRoles.user]} )
    roles: string[];

    @Column( {type: 'boolean'} )
    isActive: boolean;

    @Column( {type: 'text', nullable: true} )
    date: Date;

    @Column( { type: 'text' } )   
    address?: string;

    // Relations
    @OneToMany(
        () => Product,
        prod => prod.user,
        { cascade: true ,eager: true }
    )
    products?: Product[];

    // @OneToOne(
    //     () => Login,
    //     login => login.userlogin,
    //     { cascade: true, eager: true }
    // )
    // login?: Login;

}