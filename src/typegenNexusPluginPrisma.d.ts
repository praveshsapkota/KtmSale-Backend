import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  Account: Prisma.Account
  Session: Prisma.Session
  User: Prisma.User
  VerificationToken: Prisma.VerificationToken
  Category: Prisma.Category
  sub_catagory: Prisma.sub_catagory
  Product: Prisma.Product
  Cart: Prisma.Cart
  CartIteam: Prisma.CartIteam
  Product_Enquerie: Prisma.Product_Enquerie
  enquiredProducts: Prisma.enquiredProducts
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
      ordering: 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
      ordering: 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'password' | 'accounts' | 'sessions' | 'billing' | 'address' | 'contactNumber' | 'varified' | 'role' | 'status' | 'Cart'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'image' | 'password' | 'accounts' | 'sessions' | 'billing' | 'address' | 'contactNumber' | 'varified' | 'role' | 'status' | 'Cart'
    }
    verificationTokens: {
      filtering: 'AND' | 'OR' | 'NOT' | 'identifier' | 'token' | 'expires'
      ordering: 'identifier' | 'token' | 'expires'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'catagoryImage' | 'seoTags' | 'status' | 'slug' | 'updatedAt' | 'sub_Catagory'
      ordering: 'createdAt' | 'id' | 'name' | 'catagoryImage' | 'seoTags' | 'status' | 'slug' | 'updatedAt' | 'sub_Catagory'
    }
    subCatagories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'status' | 'subCatagoryImage' | 'seoTags' | 'slug' | 'updatedAt' | 'catagoryid' | 'Catagory' | 'Products'
      ordering: 'createdAt' | 'id' | 'name' | 'status' | 'subCatagoryImage' | 'seoTags' | 'slug' | 'updatedAt' | 'catagoryid' | 'Catagory' | 'Products'
    }
    products: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'slug' | 'sku' | 'price' | 'productImage' | 'product_thumbnail' | 'description' | 'unit' | 'discount' | 'salePrice' | 'variants' | 'seoTags' | 'status' | 'updatedAt' | 'subcatagoryId' | 'subCatagory' | 'cartid' | 'cartIteam' | 'enquiredProductId' | 'enquiredProduct'
      ordering: 'id' | 'name' | 'slug' | 'sku' | 'price' | 'productImage' | 'product_thumbnail' | 'description' | 'unit' | 'discount' | 'salePrice' | 'variants' | 'seoTags' | 'status' | 'updatedAt' | 'subcatagoryId' | 'subCatagory' | 'cartid' | 'cartIteam' | 'enquiredProductId' | 'enquiredProduct'
    }
    carts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'iteams' | 'userId' | 'User'
      ordering: 'id' | 'iteams' | 'userId' | 'User'
    }
    cartIteams: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'quantity' | 'Product' | 'cartId' | 'Cart'
      ordering: 'id' | 'quantity' | 'Product' | 'cartId' | 'Cart'
    }
    productEnqueries: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'company_name' | 'address' | 'country' | 'state' | 'phoneNumber' | 'EnquiredProducts' | 'unit' | 'orderFrequency'
      ordering: 'id' | 'email' | 'company_name' | 'address' | 'country' | 'state' | 'phoneNumber' | 'EnquiredProducts' | 'unit' | 'orderFrequency'
    }
    enquiredProducts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'productname' | 'quantity' | 'product_EnquerieId' | 'productEnquerie'
      ordering: 'id' | 'productname' | 'quantity' | 'product_EnquerieId' | 'productEnquerie'
    }
  },
  Account: {

  }
  Session: {

  }
  User: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
      ordering: 'id' | 'userId' | 'type' | 'provider' | 'providerAccountId' | 'refresh_token' | 'access_token' | 'expires_at' | 'token_type' | 'scope' | 'id_token' | 'session_state' | 'oauth_token_secret' | 'oauth_token' | 'user'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
      ordering: 'id' | 'sessionToken' | 'userId' | 'expires' | 'user'
    }
  }
  VerificationToken: {

  }
  Category: {
    sub_Catagory: {
      filtering: 'AND' | 'OR' | 'NOT' | 'createdAt' | 'id' | 'name' | 'status' | 'subCatagoryImage' | 'seoTags' | 'slug' | 'updatedAt' | 'catagoryid' | 'Catagory' | 'Products'
      ordering: 'createdAt' | 'id' | 'name' | 'status' | 'subCatagoryImage' | 'seoTags' | 'slug' | 'updatedAt' | 'catagoryid' | 'Catagory' | 'Products'
    }
  }
  sub_catagory: {
    Products: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'slug' | 'sku' | 'price' | 'productImage' | 'product_thumbnail' | 'description' | 'unit' | 'discount' | 'salePrice' | 'variants' | 'seoTags' | 'status' | 'updatedAt' | 'subcatagoryId' | 'subCatagory' | 'cartid' | 'cartIteam' | 'enquiredProductId' | 'enquiredProduct'
      ordering: 'id' | 'name' | 'slug' | 'sku' | 'price' | 'productImage' | 'product_thumbnail' | 'description' | 'unit' | 'discount' | 'salePrice' | 'variants' | 'seoTags' | 'status' | 'updatedAt' | 'subcatagoryId' | 'subCatagory' | 'cartid' | 'cartIteam' | 'enquiredProductId' | 'enquiredProduct'
    }
  }
  Product: {

  }
  Cart: {
    iteams: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'quantity' | 'Product' | 'cartId' | 'Cart'
      ordering: 'id' | 'quantity' | 'Product' | 'cartId' | 'Cart'
    }
  }
  CartIteam: {

  }
  Product_Enquerie: {
    EnquiredProducts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'productname' | 'quantity' | 'product_EnquerieId' | 'productEnquerie'
      ordering: 'id' | 'productname' | 'quantity' | 'product_EnquerieId' | 'productEnquerie'
    }
  }
  enquiredProducts: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    account: 'Account'
    accounts: 'Account'
    session: 'Session'
    sessions: 'Session'
    user: 'User'
    users: 'User'
    verificationToken: 'VerificationToken'
    verificationTokens: 'VerificationToken'
    category: 'Category'
    categories: 'Category'
    subCatagory: 'sub_catagory'
    subCatagories: 'sub_catagory'
    product: 'Product'
    products: 'Product'
    cart: 'Cart'
    carts: 'Cart'
    cartIteam: 'CartIteam'
    cartIteams: 'CartIteam'
    productEnquerie: 'Product_Enquerie'
    productEnqueries: 'Product_Enquerie'
    enquiredProducts: 'enquiredProducts'
    enquiredProducts: 'enquiredProducts'
  },
  Mutation: {
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'AffectedRowsOutput'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'AffectedRowsOutput'
    upsertOneAccount: 'Account'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'AffectedRowsOutput'
    deleteOneSession: 'Session'
    deleteManySession: 'AffectedRowsOutput'
    upsertOneSession: 'Session'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneVerificationToken: 'VerificationToken'
    updateOneVerificationToken: 'VerificationToken'
    updateManyVerificationToken: 'AffectedRowsOutput'
    deleteOneVerificationToken: 'VerificationToken'
    deleteManyVerificationToken: 'AffectedRowsOutput'
    upsertOneVerificationToken: 'VerificationToken'
    createOneCategory: 'Category'
    updateOneCategory: 'Category'
    updateManyCategory: 'AffectedRowsOutput'
    deleteOneCategory: 'Category'
    deleteManyCategory: 'AffectedRowsOutput'
    upsertOneCategory: 'Category'
    createOnesub_catagory: 'sub_catagory'
    updateOnesub_catagory: 'sub_catagory'
    updateManysub_catagory: 'AffectedRowsOutput'
    deleteOnesub_catagory: 'sub_catagory'
    deleteManysub_catagory: 'AffectedRowsOutput'
    upsertOnesub_catagory: 'sub_catagory'
    createOneProduct: 'Product'
    updateOneProduct: 'Product'
    updateManyProduct: 'AffectedRowsOutput'
    deleteOneProduct: 'Product'
    deleteManyProduct: 'AffectedRowsOutput'
    upsertOneProduct: 'Product'
    createOneCart: 'Cart'
    updateOneCart: 'Cart'
    updateManyCart: 'AffectedRowsOutput'
    deleteOneCart: 'Cart'
    deleteManyCart: 'AffectedRowsOutput'
    upsertOneCart: 'Cart'
    createOneCartIteam: 'CartIteam'
    updateOneCartIteam: 'CartIteam'
    updateManyCartIteam: 'AffectedRowsOutput'
    deleteOneCartIteam: 'CartIteam'
    deleteManyCartIteam: 'AffectedRowsOutput'
    upsertOneCartIteam: 'CartIteam'
    createOneProduct_Enquerie: 'Product_Enquerie'
    updateOneProduct_Enquerie: 'Product_Enquerie'
    updateManyProduct_Enquerie: 'AffectedRowsOutput'
    deleteOneProduct_Enquerie: 'Product_Enquerie'
    deleteManyProduct_Enquerie: 'AffectedRowsOutput'
    upsertOneProduct_Enquerie: 'Product_Enquerie'
    createOneenquiredProducts: 'enquiredProducts'
    updateOneenquiredProducts: 'enquiredProducts'
    updateManyenquiredProducts: 'AffectedRowsOutput'
    deleteOneenquiredProducts: 'enquiredProducts'
    deleteManyenquiredProducts: 'AffectedRowsOutput'
    upsertOneenquiredProducts: 'enquiredProducts'
  },
  Account: {
    id: 'String'
    userId: 'String'
    type: 'String'
    provider: 'String'
    providerAccountId: 'String'
    refresh_token: 'String'
    access_token: 'String'
    expires_at: 'Int'
    token_type: 'String'
    scope: 'String'
    id_token: 'String'
    session_state: 'String'
    oauth_token_secret: 'String'
    oauth_token: 'String'
    user: 'User'
  }
  Session: {
    id: 'String'
    sessionToken: 'String'
    userId: 'String'
    expires: 'DateTime'
    user: 'User'
  }
  User: {
    id: 'String'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    image: 'String'
    password: 'String'
    accounts: 'Account'
    sessions: 'Session'
    billing: 'String'
    address: 'String'
    contactNumber: 'String'
    varified: 'Boolean'
    role: 'User_role'
    status: 'User_status'
    Cart: 'Cart'
  }
  VerificationToken: {
    identifier: 'String'
    token: 'String'
    expires: 'DateTime'
  }
  Category: {
    createdAt: 'DateTime'
    id: 'String'
    name: 'String'
    catagoryImage: 'String'
    seoTags: 'String'
    status: 'String'
    slug: 'String'
    updatedAt: 'DateTime'
    sub_Catagory: 'sub_catagory'
  }
  sub_catagory: {
    createdAt: 'DateTime'
    id: 'String'
    name: 'String'
    status: 'String'
    subCatagoryImage: 'String'
    seoTags: 'String'
    slug: 'String'
    updatedAt: 'DateTime'
    catagoryid: 'String'
    Catagory: 'Category'
    Products: 'Product'
  }
  Product: {
    id: 'String'
    name: 'String'
    slug: 'String'
    sku: 'String'
    price: 'Int'
    productImage: 'String'
    product_thumbnail: 'String'
    description: 'String'
    unit: 'Int'
    discount: 'Int'
    salePrice: 'Int'
    variants: 'Json'
    seoTags: 'String'
    status: 'String'
    updatedAt: 'DateTime'
    subcatagoryId: 'String'
    subCatagory: 'sub_catagory'
    cartid: 'String'
    cartIteam: 'CartIteam'
    enquiredProductId: 'String'
    enquiredProduct: 'enquiredProducts'
  }
  Cart: {
    id: 'String'
    iteams: 'CartIteam'
    userId: 'String'
    User: 'User'
  }
  CartIteam: {
    id: 'String'
    quantity: 'Int'
    Product: 'Product'
    cartId: 'String'
    Cart: 'Cart'
  }
  Product_Enquerie: {
    id: 'String'
    email: 'String'
    company_name: 'String'
    address: 'String'
    country: 'String'
    state: 'String'
    phoneNumber: 'String'
    EnquiredProducts: 'enquiredProducts'
    unit: 'Int'
    orderFrequency: 'String'
  }
  enquiredProducts: {
    id: 'String'
    productname: 'Product'
    quantity: 'Int'
    product_EnquerieId: 'String'
    productEnquerie: 'Product_Enquerie'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Account: Typegen.NexusPrismaFields<'Account'>
  Session: Typegen.NexusPrismaFields<'Session'>
  User: Typegen.NexusPrismaFields<'User'>
  VerificationToken: Typegen.NexusPrismaFields<'VerificationToken'>
  Category: Typegen.NexusPrismaFields<'Category'>
  sub_catagory: Typegen.NexusPrismaFields<'sub_catagory'>
  Product: Typegen.NexusPrismaFields<'Product'>
  Cart: Typegen.NexusPrismaFields<'Cart'>
  CartIteam: Typegen.NexusPrismaFields<'CartIteam'>
  Product_Enquerie: Typegen.NexusPrismaFields<'Product_Enquerie'>
  enquiredProducts: Typegen.NexusPrismaFields<'enquiredProducts'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  