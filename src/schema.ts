import { permissions } from './permissions'
import dotenv from 'dotenv'
import { UploadImage } from "./utils/s3"
import { sign , verify} from "jsonwebtoken"
import path from "path"
// import {} from "next-auth"
import {
  makeSchema,
  objectType,
  asNexusMethod,
  queryType,
  nonNull,
  stringArg,
  list,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { nexusPrisma } from 'nexus-plugin-prisma'
import {Product  , ProductEnquerie , Cart,cartIteams,EnquiredProducts} from './schema/Product/types'
import { Category, SubCatagory } from './schema/Catagory/types'
import { GraphQLUpload } from "graphql-upload"
import { User } from "./schema/User/type"
import { generateUploadUrl } from './utils/s3'
import { compare, hash } from 'bcryptjs'
import { applyMiddleware } from 'graphql-middleware'


dotenv.config()
export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query_type = queryType({
  definition(t) {
    t.crud.user()
    t.crud.product()
    t.crud.products({
      pagination: true,
      filtering: true,
    })
    t.crud.category()
    t.crud.categories()
    t.crud.subCatagory()
    t.crud.subCatagories()
  },
})

const Mutation_type = objectType({
  name: 'Mutation',
  definition(t) {

    t.crud.createOneCategory({
      // async resolve(root, args, ctx, info, originalResolve) {
      //   console.log(args);
      //   console.log('logic before the resolver')
      //   const res = await originalResolve(root, args, ctx, info)
      //   console.log('logic after the resolver')
      //   return res
      // }
    })
    t.crud.updateOneCategory()
    t.crud.deleteOneCategory()
    t.crud.createOnesub_catagory()
    t.crud.updateOnesub_catagory()
    t.crud.deleteOnesub_catagory()
    t.crud.createOneProduct()
    t.crud.updateOneProduct()
    t.crud.deleteOneProduct()
    t.field("S3ImageUpload", {
      type: nonNull(list("String")),
      args: {
        file: nonNull(list(nonNull(GraphQLUpload))
        )
      },
      async resolve(parent, { file }) {
        const results = await Promise.allSettled(file.map(UploadImage));
        console.log(results);
        //@ts-expect-error
        const reducedResult = results.reduce((storedFiles, { status, value, reason }) => {
          console.log(value, reason, status);
          //@ts-expect-error
           if (value) storedFiles.push(value)
          else console.error(`Failed to store upload: ${reason}`);
          return storedFiles;
        }, [])
        console.log(reducedResult);

        return reducedResult
      }
    })
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        address: nonNull(stringArg()),
        contactNo: stringArg()
      },
      resolve: async (_parent, args, ctx) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            contactNumber: args.contactNo,
            password: hashedPassword,
          },
        })
        return {
          // @ts-expect-error
          token: sign({ userId: user.id, userRole: user.role, userName: user.name }, process.env.JWT_BACKEND_SECRET),
          // user: user
        }
      },
    })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})


export const schemaWithoutPermissions = makeSchema({
  types: [
    Query_type,
    Mutation_type,
    User,
    Category,
    Product,
    SubCatagory,
    AuthPayload,
    cartIteams,
    ProductEnquerie,
    EnquiredProducts,
    Cart,
    DateTime,
  ],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      // shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
      outputs: {
        // We need it in src because production build will crash at tsc compiling
        typegen: __dirname + '/typegenNexusPluginPrisma.d.ts',
      },
      paginationStrategy: 'prisma',
    }),
  ],
  shouldGenerateArtifacts: true,
  outputs: {
    schema: path.join(__dirname, '..', 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, '..', 'generated', 'nexus-typegen.d.ts'),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve("../node_modules/.prisma/client/index.d.ts"),
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
