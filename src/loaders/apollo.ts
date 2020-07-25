import { buildTypeDefsAndResolvers } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { logging } from './apollo.plugin';
import { LogAccess, ResolveTime } from '../resolvers/middlewares/common.middlewares';
import { Container } from 'typedi';

export default async ({ app }): Promise<any> => {
    const redis = Container.get('redis');
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [path.join(__dirname + '/../resolvers/**/*.resolver.ts')],
        globalMiddlewares: [ResolveTime, LogAccess],
        validate: false,
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => ({ redis, url: req.protocol + '://' + req.get('host') }),
        plugins: [logging],
    });
    apolloServer.applyMiddleware({ app });
};
