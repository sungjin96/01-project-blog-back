import { buildTypeDefsAndResolvers } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { logging } from './apollo.plugin';

export default async ({ app }): Promise<any> => {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [path.join(__dirname + '/../resolvers/**/*.resolver.ts')],
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer({ schema, plugins: [logging] });
    apolloServer.applyMiddleware({ app });
};
