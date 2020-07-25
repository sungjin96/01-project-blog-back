import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { Container } from 'typedi';

export class ResolveTime implements MiddlewareInterface<any> {
    constructor() {}
    async use({ context, info }: ResolverData<any>, next: NextFn) {
        const { silly } = Container.get('logger');

        const start = Date.now();
        await next();
        const resolveTime = Date.now() - start;
        silly(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
    }
}

export class LogAccess implements MiddlewareInterface<any> {
    constructor() {}

    async use({ context, info }: ResolverData<any>, next: NextFn) {
        const { silly } = Container.get('logger');
        const username: string = context.username || 'guest';
        silly(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
        return next();
    }
}

export class isAuth implements MiddlewareInterface<any> {
    constructor() {}

    async use({ context, info }: ResolverData<any>, next: NextFn) {
        const { silly } = Container.get('logger');
        const username: string = context.username || 'guest';
        silly(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
        return next();
    }
}
