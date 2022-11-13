// import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from './user.entity';

// @Entity({name: 'login'})
// export class Login {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column( { type: 'text', nullable: true } )
//     token: string;

//     @Column( {type: 'datetime', nullable: true} )
//     date: Date;

//     @OneToOne(
//         () => User,
//         user => user.login
//     )
//     userlogin: User;

// }