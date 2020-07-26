import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';

@ObjectType()
@Entity('images')
export default class ImageEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    @Field()
    path: string;

    @Column()
    @Field()
    fileName: string;

    @Column()
    @Field()
    originFileName: string;

    @Column()
    @Field()
    fileSize: string;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
