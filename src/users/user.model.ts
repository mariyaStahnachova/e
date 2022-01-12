import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {UserRoles} from "../roles/userRoles.model";
import {Roles} from "../roles/roles.model";
import {Post} from "../posts/posts.model";


interface IUser{
    password: string;
    email: string;
}

@Table
export class User extends Model<User,IUser> {
    [x: string]: any;
    @Column({type: DataType.INTEGER,  unique:true, autoIncrement:true,primaryKey:true})
    id: number;

    @Column({type: DataType.STRING,unique:true, allowNull:false})
    email: string;

    @Column({type: DataType.STRING,unique:false, allowNull:false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false })
    ban: boolean;

    @Column({type: DataType.STRING, allowNull:true })
    banReason: string;

    @BelongsToMany(()=>Roles, ()=>UserRoles)
    roles:Roles[];

    @HasMany(()=>Post)
    posts:Post[]
}
