import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';

import {User} from "../users/user.model";


interface IPost{
    userId: string;
    title: string;
    content:string;
    image: string;
}

@Table
export class Post extends Model<Post,IPost> {
    [x: string]: any;
    @Column({type: DataType.INTEGER,  unique:true, autoIncrement:true,primaryKey:true})
    id: number;

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    userId:string

    @BelongsTo(()=>User)
    author:User

}
