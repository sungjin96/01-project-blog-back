import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';

@ObjectType()
@Entity('likes')
export default class LikeEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    @Field()
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
