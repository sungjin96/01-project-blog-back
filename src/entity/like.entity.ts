import { BaseEntity, BeforeInsert, CreateDateColumn, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import BlogEntity from './blog.entity';
import UserEntity from './user.entity';

@ObjectType()
@Entity('likes')
export default class LikeEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @ManyToOne((type) => BlogEntity, (blog) => blog.likes)
    blog: BlogEntity;

    @ManyToOne((type) => UserEntity, (user) => user.likes)
    @Field((type) => UserEntity)
    author: UserEntity;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
