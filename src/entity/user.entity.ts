import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity('users')
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    lastName?: string;

    @Field(() => String, { nullable: true })
    username(@Root() parent: UserEntity): string | null {
        return parent.firstName && parent.lastName ? `${parent.firstName} ${parent.lastName}` : null;
    }

    @Column('varchar', { length: 255 })
    @Field()
    nickName: string;

    @Column('varchar', { length: 255 })
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    profile: string;

    @Column({ default: 0 })
    @Field(() => Number, { defaultValue: 0 })
    role: number;

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

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }

    @BeforeInsert()
    addProfile() {
        this.profile = `${config.clientUrl}/profile/${this.nickName}`;
    }
}
