import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import config from '../config';
import { v4 } from 'uuid';
import ImageEntity from './image.entity';

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

    @Column({ nullable: true, default: false })
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    confirmed: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Field(() => Date)
    updatedAt: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }

    @BeforeInsert()
    addProfile() {
        this.profile = `${config.clientUrl}/profile/${this.nickName}`;
    }
}
