import { Mutation, Query, Resolver, Arg } from 'type-graphql';
import { Container } from 'typedi';

import { CategoryOutput, CreateCategoryInput, GetCategoriesInput, CategoriesOutput } from './category.types';
import CategoryService from '../../services/category.service';

@Resolver()
export default class CategoryResolver {
    @Query(() => CategoriesOutput)
    async getCategories(@Arg('data') { userId }: GetCategoriesInput): Promise<CategoriesOutput> {
        const { debug, error } = Container.get('logger');
        let categoriesOutput = new CategoriesOutput();
        debug('Calling CreateCategory Mutation with params: %o', { userId });
        try {
            const categoryService = Container.get(CategoryService);
            categoriesOutput = await categoryService.GetCategories({ userId, categoriesOutput });
        } catch (e) {
            error('🔥 error: %o', e);
            categoriesOutput.error = e;
            categoriesOutput.status = 400;
        }
        return categoriesOutput;
    }

    @Mutation(() => CategoryOutput)
    async createParantCategory(@Arg('data') { userId, name }: CreateCategoryInput): Promise<CategoryOutput> {
        const { debug, error } = Container.get('logger');
        let categoryOutput = new CategoryOutput();
        debug('Calling CreateCategory Mutation with params: %o', { userId, name });
        try {
            const categoryService = Container.get(CategoryService);
            categoryOutput = await categoryService.CreateParantCategory({ userId, name, categoryOutput });
        } catch (e) {
            error('🔥 error: %o', e);
            categoryOutput.error = e;
            categoryOutput.status = 400;
        }

        return categoryOutput;
    }

    // @Mutation()
    // async updateCategory() {}

    // @Mutation()
    // async deleteCategory() {}
}
