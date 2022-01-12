import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from "../users/user.model";
import {Roles} from "./roles.model";



@Table({tableName:'user-roles', createdAt:false, updatedAt:false})
export class UserRoles extends Model<UserRoles> {
    @Column({type: DataType.INTEGER, primaryKey:true, unique:true, autoIncrement: true})
    id: number;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(()=>Roles)
    @Column({type: DataType.INTEGER})
    roleId: number;

}
