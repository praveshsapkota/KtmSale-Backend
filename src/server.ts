import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import { schemaWithoutPermissions , schema } from './schema'
import { createContext } from './context'
import { createServer } from 'http'
import cors from "cors"
// import { ApolloServerPluginUsageReporting } from "apollo-server-core"
import dotenv from 'dotenv'

dotenv.config()


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
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // ApolloServerPluginUsageReporting({
            //     rewriteError(err) {
            //       // Make sure that a specific pattern is removed from all error messages.
            //       if (err.message.startsWith('Database Error: ')) {
            //         err.message = err.message.replace(, "REDACTED");
            //     }
            //         err.message = err.message.replace(/x-api-key:[A-Z0-9-]+/, "REDACTED");
            //         return err;
            //     }
            //     }),
        ],
        context: createContext,
        formatError : (err)=>{
            if (err.message.startsWith('Database Error: ')) {
                console.log("database Error " , err);
                return new Error('Internal server error')
            }
              // Otherwise return the original error. The error can also
              // be manipulated in other ways, as long as it's returned.
            return err;
        },
        // resolvers,
        // typeDefs,
        introspection: process.env.NODE_ENV === 'production'
    })
    // More required logic for integrating with Express
    await server.start()

    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress({
        maxFileSize: 10000000000, // 10 MB
        maxFiles: 20,
    }))
    app.use(cors({
        origin : ['http://localhost:3000', 'https://studio.apollographql.com' , 'ktm-sale.vercel.app' , 'www.praveshsapkota.com.np'],
        credentials: true,
        preflightContinue : true,
        allowedHeaders: ['Authorization'],
        exposedHeaders: ['Authorization'],
    }))
    app.get("/hellow1", (req, res) => {
        res.send("hellow bro")
    })
    server.applyMiddleware({
        app,
        path: '/',
    })

    // Modified server start
    await new Promise((resolve) =>
        httpServer.listen({ port: (process.env.PORT || 5000) }, (): void => {
            console.log(
                `🚀 Server ready at http://localhost:5000${server.graphqlPath}`,
            )
        }
        ),
    )
}

startApolloServer(schema)
