import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import TagEntity from './tag.entity';
import CategoryEntity from './category.entity';
import UserEntity from './user.entity';

@ObjectType()
@Entity('blogs')
export default class BlogEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Field({ description: '글 제목' })
    title: string;

    @Column()
    @Field({ description: '글 Slug' })
    slug: string;

    @Column()
    @Field({ description: '글 내용' })
    body: string;

    @Column()
    @Field({ description: '글 내용 요약' })
    excerpt: string;

    @Column()
    @Field({ description: '글 SEO를 위한 제목' })
    mtitle: string;

    @Column()
    @Field({ description: '글 SEO를 위한 내용' })
    mdesc: string;

    @Field((type) => UserEntity, { nullable: true })
    user: UserEntity;

    @Field((type) => [TagEntity], { nullable: true })
    tags?: TagEntity[];

    @Field((type) => CategoryEntity)
    category: CategoryEntity;
}
