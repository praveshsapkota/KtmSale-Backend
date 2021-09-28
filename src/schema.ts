import { permissions } from './permissions'
import { UploadImage } from "./utils/s3"

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
import Product from './schema/Product/types'
import { Category, SubCatagory } from './schema/Catagory/types'
import { GraphQLUpload } from "graphql-upload"
import { generateUploadUrl } from './utils/s3'
import { type } from 'node:os'
import { NexusListDef } from 'nexus/dist/core'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const query_t = queryType({
  definition(t) {
    t.crud
      .user
      //   // {
      //   //   async resolve(__root,{where:{id}},ctx,_info){
      //   //     return await ctx.prisma.
      //   //   }
      //   // }
      ()
    // t.crud.users(
    //   {
    //     resolve : (root,_,ctx)=>{
    //       return ctx.prisma.user.findUnique({where : {id : root}})
    //     }
    //   }
    // )
    t.crud.product()
    t.crud.products({
      pagination: true,
      filtering: true,
    })
    t.crud.category()
    t.crud.categories()
    t.crud.subCatagory()
    t.crud.subCatagories()

    t.field('GetS3SecuredUrl', {
      type: "String",
      args: {
        imagename: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        const url = generateUploadUrl(args.imagename)
        return url
      },
    })
    // t.crud.cartItem()
    // t.field('user1',{
    //   type : 'User'
    //   resolve : (root,__,) =>{
    //     return
    //   }
    // })
    // t.crud.users({
    //   ordering: true,
    //   filtering : true
    // })
    // t.crud.post()
    // t.crud.posts({
    //   filtering: true,
    // })
  },
})

const Mutation = objectType({
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
      // type: list("UploadedFileResponse"),
      type: nonNull(list("String")),
      args: {
        file: nonNull(list(nonNull(GraphQLUpload))
        )
      },
      async resolve(parent, { file }) {
        const results = await Promise.allSettled(file.map(UploadImage));
        console.log(results);
        const reducedResult = results.reduce((storedFiles, { status, value, reason }) => {
          console.log(value, reason, status);
          if (value) storedFiles.push(value)
          else console.error(`Failed to store upload: ${reason}`);
          return storedFiles;
        }, [])
        console.log(reducedResult);

        return reducedResult
      }
    })
    //     t.field('signup', {
    //       type: 'AuthPayload',
    //       args: {
    //         name: stringArg(),
    //         email: nonNull(stringArg()),
    //         password: nonNull(stringArg()),
    //       },
    //       resolve: async (_parent, args, context: Context) => {
    //         const hashedPassword = await hash(args.password, 10)
    //         const user = await context.prisma.user.create({
    //           data: {
    //             name: args.name,
    //             email: args.email,
    //             password: hashedPassword,
    //           },
    //         })
    //         return {
    //           token: sign({ userId: user.id }, APP_SECRET),
    //           user,
    //         }
    //       },
    //     })

    //     t.field('login', {
    //       type: 'AuthPayload',
    //       args: {
    //         email: nonNull(stringArg()),
    //         password: nonNull(stringArg()),
    //       },
    //       resolve: async (_parent, { email, password }, context: Context) => {
    //         const user = await context.prisma.user.findUnique({
    //           where: {
    //             email,
    //           },
    //         })
    //         if (!user) {
    //           throw new Error(`No user found for email: ${email}`)
    //         }
    //         const passwordValid = await compare(password, user.password)
    //         if (!passwordValid) {
    //           throw new Error('Invalid password')
    //         }
    //         return {
    //           token: sign({ userId: user.id }, APP_SECRET),
    //           user,
    //         }
    //       },
    //     })

    //     t.field('createDraft', {
    //       type: 'Post',
    //       args: {
    //         data: nonNull(
    //           arg({
    //             type: 'PostCreateInput',
    //           }),
    //         ),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         const userId = getUserId(context)
    //         return context.prisma.post.create({
    //           data: {
    //             title: args.data.title,
    //             content: args.data.content,
    //             authorId: userId,
    //           },
    //         })
    //       },
    //     })

    //     t.field('togglePublishPost', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: async (_, args, context: Context) => {
    //         try {
    //           const post = await context.prisma.post.findUnique({
    //             where: { id: args.id || undefined },
    //             select: {
    //               published: true,
    //             },
    //           })
    //           return context.prisma.post.update({
    //             where: { id: args.id || undefined },
    //             data: { published: !post?.published },
    //           })
    //         } catch (e) {
    //           throw new Error(
    //             `Post with ID ${args.id} does not exist in the database.`,
    //           )
    //         }
    //       },
    //     })

    //     t.field('incrementPostViewCount', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         return context.prisma.post.update({
    //           where: { id: args.id || undefined },
    //           data: {
    //             viewCount: {
    //               increment: 1,
    //             },
    //           },
    //         })
    //       },
    //     })

    //     t.field('deletePost', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         return context.prisma.post.delete({
    //           where: { id: args.id },
    //         })
    //       },
    //     })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.field('CartItem', {
      type: 'CartItem',
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .CartItem()
      },
    })
    // t.nonNull.list.field('OrderDetail',{
    //   type : ''
    // })

    // t.nonNull.list.nonNull.field('posts', {
    //   type: 'Post',
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id || undefined },
    //       })
    // .posts()
    // },
    // })
  },
})

const CartItem = objectType({
  name: 'CartItem',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('item')
    t.nonNull.string('quantity')
    // t.nonNull.field('user',{
    //   type:'User',
    //   // resolve : (root,_,ctx)=>{
    //   //   return ctx.prisma.cartItem.findUnique({
    //   //     where : {id : root.id}
    //   //   }).User()
    //   // }
    // })
  },
})

// const Product = objectType({
//   name: 'Product',
//   definition(t) {
//     t.nonNull.string('category')
//     t.string('sub_catagory')
//     t.nonNull.int('price')
//     t.string('name')
//   },
// })

// const Category = objectType({
//   name: 'Category',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.string('name')
//     t.nonNull.string('slug')
//     t.nonNull.list.field('sub_catagory', {
//       type: 'sub_catagory',
//       resolve: (parent, _, context) => {
//         return context.prisma.category
//           .findUnique({
//             where: { id: parent.id },
//           })
//           .sub_Catagorys()
//       },
//     })
//   },
// })

// const sub_catagory = objectType({
//   name: 'sub_catagory',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.string('name')
//     t.nonNull.string('slug')
//     t.nonNull.list.field('Product', {
//       type: 'Product',
//       resolve: (parent, _, context) => {
//         return context.prisma.sub_catagory
//           .findUnique({
//             where: { id: parent.id },
//           })
//           .Products()
//       },
//     })
//   },
// })

// const OrderDetail = objectType({
//   name : 'OrderDetail' ,
//   definition(t){
//     t.nonNull.id('id')
//     t.nonNull.string()
//   }
// })

// const Post = objectType({
//   name: 'Post',
//   definition(t) {
//     t.nonNull.int('id')
//     t.nonNull.field('createdAt', { type: 'DateTime' })
//     t.nonNull.field('updatedAt', { type: 'DateTime' })
//     t.nonNull.string('title')
//     t.string('content')
//     t.nonNull.boolean('published')
//     t.nonNull.int('viewCount')
//     t.field('author', {
//       type: 'User',
//       resolve: (parent, _, context: Context) => {
//         return context.prisma.post
//           .findUnique({
//             where: { id: parent.id || undefined },
//           })
//           .author()
//       },
//     })
//   },
// })

// const SortOrder = enumType({
//   name: 'SortOrder',
//   members: ['asc', 'desc'],
// })

// const PostOrderByUpdatedAtInput = inputObjectType({
//   name: 'PostOrderByUpdatedAtInput',
//   definition(t) {
//     t.nonNull.field('updatedAt', { type: 'SortOrder' })
//   },
// })

// const UserUniqueInput = inputObjectType({
//   name: 'UserUniqueInput',
//   definition(t) {
//     t.int('id')
//     t.string('email')
//   },
// })

// const PostCreateInput = inputObjectType({
//   name: 'PostCreateInput',
//   definition(t) {
//     t.nonNull.string('title')
//     t.string('content')
//   },
// })

// const UserCreateInput = inputObjectType({
//   name: 'UserCreateInput',
//   definition(t) {
//     t.nonNull.string('email')
//     t.string('name')
//     t.list.nonNull.field('posts', { type: 'PostCreateInput' })
//   },
// })

// const AuthPayload = objectType({
//   name: 'AuthPayload',
//   definition(t) {
//     t.string('token')
//     t.field('user', { type: 'User' })
//   },
// })

export const schemaWithoutPermissions = makeSchema({
  types: [
    query_t,
    User,
    Product,
    // ProductImages,
    SubCatagory,
    CartItem,
    DateTime,
    Category,
    Mutation,
    // product_q,
    // Query,
    // Post,
    // AuthPayload,
    // UserUniqueInput,
    // UserCreateInput,
    // PostCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
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
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

// export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
