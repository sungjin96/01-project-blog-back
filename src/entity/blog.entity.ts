import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import TagEntity from './tag.entity';
import CategoryEntity from './category.entity';
import UserEntity from './user.entity';
import { v4 } from 'uuid';
import LikeEntity from './like.entity';
import CommentEntity from './comment.entity';
import ImageEntity from './image.entity';

@ObjectType()
@Entity('blogs')
export default class BlogEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
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

    @Column('int')
    @Field(() => Number, { defaultValue: '읽은 수' })
    viewCount: number;

    @Field(() => ImageEntity, { nullable: true })
    thumbnail: ImageEntity;

    @Field((type) => UserEntity, { nullable: true })
    author: UserEntity;

    @Field((type) => [LikeEntity!]!)
    likes: LikeEntity[];

    @Field((type) => [TagEntity!]!)
    tags?: TagEntity[];

    @Field((type) => CategoryEntity)
    category: CategoryEntity;

    @Field((type) => [CommentEntity!]!)
    comments: CommentEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    @Field(() => Date)
    deletedAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
