import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    Like,
    JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import config from '../config';
import { v4 } from 'uuid';
import ImageEntity from './image.entity';
import CategoryEntity from './category.entity';
import CommentEntity from './comment.entity';
import BlogEntity from './blog.entity';
import LikeEntity from './like.entity';
import { ManyToMany } from 'typeorm';

@ObjectType()
@Entity('users')
export default class UserEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    name?: string;

    @Column('varchar', { length: 255 })
    @Field()
    nickName: string;

    @Column('text', { unique: true })
    @Field()
    email: string;

    @Column()
    password: string;

    @Column()
    @Field()
    profile: string;

    @Column({ default: 0 })
    @Field(() => Number, { defaultValue: 0 })
    role: number;

    @OneToOne((type) => ImageEntity, (image) => image.userIcon)
    @Field((type) => ImageEntity, { nullable: true })
    userIcon?: ImageEntity;

    @Column({ nullable: true })
    @Field({ nullable: true })
    about?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    homePageUrl?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    gitUrl?: string;

    @Column('bool', { nullable: true, default: false })
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    confirmed: boolean;

    @OneToMany((type) => CategoryEntity, (category) => category.author)
    @Field(() => [CategoryEntity!]!)
    categories: CategoryEntity[];

    @OneToMany((type) => BlogEntity, (blog) => blog.author)
    @Field(() => [BlogEntity!]!)
    blogs: BlogEntity[];

    @OneToMany((type) => CommentEntity, (comment) => comment.author)
    @Field(() => [CommentEntity!]!)
    comments: CommentEntity[];

    @OneToMany((type) => LikeEntity, (like) => like.author)
    likes: LikeEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }

    @BeforeInsert()
    addProfile() {
        this.profile = `${config.clientUrl}/profile/${this.nickName}`;
    }
}
