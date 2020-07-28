import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import UserEntity from './user.entity';
import BlogEntity from './blog.entity';

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

    @OneToOne(type => UserEntity, user => user.userIcon)
    userIcon: UserEntity

    @OneToOne(type => BlogEntity, blog => blog.thumbnail)
    thumbnail: BlogEntity

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
