import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';


interface IUser{
    password: string;
    email: string;
}

@Table
export class User extends Model<User,IUser> {
    @Column({type: DataType.INTEGER, primaryKey:true, unique:true,  allowNull:false})
    id: number;

    @Column({type: DataType.STRING,unique:true, allowNull:false})
    email: string;

    @Column({type: DataType.STRING,unique:false, allowNull:false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false })
    ban: boolean;

    @Column({type: DataType.STRING, allowNull:true })
    banReason: string;
    //
    // @BelongsToMany(()=>Roles, ()=>UserRoles)
    // roles:Roles[];
}
