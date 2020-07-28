import { Inject, Service } from 'typedi';
import {
    CreateCategoryInput,
    CategoryOutput,
    GetCategoriesInput,
    CategoriesOutput,
} from '../resolvers/category/category.types';
import { slugify } from '../utils/common.utils';

@Service()
export default class CategoryService {
    @Inject('categoryEntity')
    private categoryEntity;
    @Inject('logger')
    private logger;

    constructor() {}

    async GetCategories({
        userId,
        categoriesOutput,
    }: {
        userId: string;
        categoriesOutput: CategoriesOutput;
    }): Promise<CategoriesOutput> {
        this.logger.silly('카테고리 조회 시작...');
        try {
            this.logger.silly('카테고리 조회 중...');
            const categories = await this.categoryEntity
                .createQueryBuilder('categories')
                .leftJoinAndSelect('categories.childCategories', 'child')
                .leftJoinAndSelect('categories.author', 'users')
                .where('categories.author = :id', { id: userId })
                .getMany();

            categoriesOutput.data = categories;
            
            return categoriesOutput;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async CreateParantCategory({
        userId,
        name,
        categoryOutput,
    }: {
        userId: string;
        name: string;
        categoryOutput: CategoryOutput;
    }): Promise<CategoryOutput> {
        this.logger.silly('카테고리 생성 시작...');
        try {
            this.logger.silly('카테고리 세팅 중...');
            let category = this.categoryEntity.create({
                author: userId,
                name: name,
                slug: slugify(name),
            });

            this.logger.silly('카테고리 저장 중...');
            await category.save();

            categoryOutput.data = category;

            return categoryOutput
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
