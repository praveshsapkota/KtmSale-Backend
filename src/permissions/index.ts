import { shield, rule, and, inputRule, deny, allow } from 'graphql-shield'
import { isAdminFromHeader } from '../utils/utils'
import { Context } from '../context'

const Rules = {
  isAdmin: rule()((_parent, _args, context: Context) => {
    const admin = isAdminFromHeader(context) || false
    if(admin){
      console.log(isAdminFromHeader(context))
      return admin
    }
    return new Error("Not authorized please contact admin to allow access")
  }),
  signup : rule()((_parent, _args, context: Context) => {
    return true
  }),
  // isPostOwner: rule()(async (_parent, args, context) => {
  //   const userId = getUserEmailWithRole(context)
  //   const author = await context.prisma.post
  //     .findUnique({
  //       where: {
  //         id: Number(args.id),
  //       },
  //     })
  //     .author()
  //   return userId === author.id
  // }),
}

export const permissions = shield({
  Query: {
    '*': allow,
  },
  Mutation: {
    '*': deny,
    createOneCategory: Rules.isAdmin,
    updateOneCategory: Rules.isAdmin,
    // deleteOneCategory : Rules.isAdmin,
    createOnesub_catagory: Rules.isAdmin,
    updateOnesub_catagory: Rules.isAdmin,
    // deleteOnesub_catagory : Rules.isAdmin,
    createOneProduct: Rules.isAdmin,
    updateOneProduct: Rules.isAdmin,
    // deleteOneProduct : Rules.isAdmin,
    S3ImageUpload: Rules.isAdmin,
    signup : Rules.signup,
  },
})
