import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import { schemaWithoutPermissions } from './schema'
import { createContext } from './context'
import { createServer } from 'http'

const startApolloServer = async (
    schema: any,
    typeDefs?: any,
    resolvers?: any,
) => {
    // Required logic for integrating with Express
    const app = express()
    const httpServer = createServer(app)

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema: schema,
        context: createContext,
        // typeDefs,
        // resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    // More required logic for integrating with Express
    await server.start()

    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress())
    server.applyMiddleware({
        app,

        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: '/',
    })

    // Modified server startup
    await new Promise((resolve) =>
        httpServer.listen({ port: 4000 }, (): void =>
            console.log(
                `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
            ),
        ),
    )
}

startApolloServer(schemaWithoutPermissions)
