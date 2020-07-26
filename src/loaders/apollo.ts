import { buildTypeDefsAndResolvers } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { logging } from './apollo.plugin';
import { LogAccess, ResolveTime } from '../resolvers/middlewares/common.middlewares';
import { Container } from 'typedi';
import config from '../config';

export default async ({ app }): Promise<any> => {
    const redis = Container.get('redis');
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [path.join(__dirname + '/../resolvers/**/*.resolver.ts')],
        //globalMiddlewares: [ResolveTime, LogAccess],
        globalMiddlewares: [ResolveTime],
        validate: true,
        authChecker: ({ context: { session } }) => {
            return !!session.userId;
        },
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => {
            return { redis, session: req.session, url: req.protocol + '://' + req.get('host') };
        },
        playground:
            config.nodeEnv === 'production'
                ? false
                : {
                      settings: {
                          'request.credentials': 'include',
                      },
                  },
        plugins: [logging],
    });
    apolloServer.applyMiddleware({ app });
};
