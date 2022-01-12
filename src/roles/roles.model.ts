import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {User} from "../users/user.model";
import {UserRoles} from "./userRoles.model";

interface IRole{
    value: string;
    description: string;
}

@Table
export class Roles extends Model<Roles,IRole> {
    @Column({type: DataType.INTEGER, primaryKey:true, unique:true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING,unique:true, allowNull:false})
    value: string;

    @Column({type: DataType.STRING,unique:false, allowNull:false})
    description: string;

    @BelongsToMany(()=>User, ()=>UserRoles)
    users:User[];

}
