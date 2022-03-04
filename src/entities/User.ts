import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { GraphQLEmail } from 'graphql-custom-types';
import { Field, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
import { Category, PrivateMessage } from '.';

@Entity()
@ObjectType()
export default class User {
  @Field(() => String)
  @PrimaryKey()
  id: string = v4();

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => Boolean, { defaultValue: true })
  @Property()
  online?: boolean;

  @Field(() => GraphQLEmail)
  @Property()
  email!: string;

  @Field(() => String)
  @Property({ unique: true })
  username!: string;

  @Property()
  password!: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  about?: string;

  @Field(() => [User])
  @ManyToMany(() => User)
  friends = new Collection<User>(this);

  @Field(() => [PrivateMessage])
  @ManyToMany(() => PrivateMessage)
  privateMessages = new Collection<PrivateMessage>(this);

  @Field(() => [Category])
  @ManyToMany(() => Category)
  chatRooms = new Collection<Category>(this);
}
