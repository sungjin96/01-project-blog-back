import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import BlogEntity from './blog.entity';
import { v4 } from 'uuid';
import UserEntity from './user.entity';

@ObjectType()
@Entity('categories')
export default class CategoryEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    slug: string;

    @ManyToOne((type) => CategoryEntity, (category) => category.childCategories)
    parentCategory: CategoryEntity;

    @OneToMany((type) => CategoryEntity, (category) => category.parentCategory)
    @Field((type) => [CategoryEntity!]!)
    childCategories: CategoryEntity[];

    @ManyToOne((type) => UserEntity, (user) => user.categories)
    @Field((type) => UserEntity)
    author: UserEntity;

    @OneToMany((type) => BlogEntity, (blog) => blog.category)
    @Field((type) => [BlogEntity!]!)
    blogs: BlogEntity[];

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
}
