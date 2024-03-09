import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export default class Seance extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column()
    @Field()
    distance: number;
    
    @Column()
    @Field()
    duree: number;
    
    @Column()
    @Field()
    ressenti: string;
    
    @Column()
    @Field()
    date: string;
}

@InputType()
export class InputCreateSeance {
    @Field()
    distance: number;
    
    @Field()
    duree: number;
    
    @Field()
    ressenti: string;
    
    @Field()
    date: string;
}

@InputType()
export class InputUpdateSeance {
    @Field({ nullable: true})
    distance?: number;
    
    @Field({ nullable: true})
    duree?: number;
    
    @Field({ nullable: true})
    ressenti?: string;
    
    @Field({ nullable: true})
    date?: string;

}