import { ObjectType, Field, InputType } from 'type-graphql';
import CategoryEntity from '../../entity/category.entity';
import { CommonOutputType } from '../common.types';

@ObjectType()
export class CategoriesOutput extends CommonOutputType {
    @Field(type => [CategoryEntity!]!,{ nullable: true })
    data?: CategoryEntity[];
}

@ObjectType()
export class CategoryOutput extends CommonOutputType {
    @Field(type => CategoryEntity,{ nullable: true })
    data?: CategoryEntity;
}


@InputType()
export class CreateCategoryInput {

  @Field()
  userId: string;

  @Field()
  name: string;
}


@InputType()
export class GetCategoriesInput {

  @Field()
  userId: string;

}