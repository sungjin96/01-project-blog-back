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
        //globalMiddlewares: [ResolveTime, LogAccess],
        globalMiddlewares: [ResolveTime],
        validate: true,
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer({
        schema,
        formatError: (err) => {
            // Don't give the specific errors to the client.
            if (err.message.startsWith('Database Error: ')) {
                return new Error('Internal server error');
            }
            // Otherwise return the original error.  The error can also
            // be manipulated in other ways, so long as it's returned.
            return err;
        },
        context: ({ req }) => ({ redis, req, url: req.protocol + '://' + req.get('host') }),
        plugins: [logging],
    });
    apolloServer.applyMiddleware({ app });
};
