import { objectType, } from 'nexus'

export const Product = objectType({
    name: 'Product',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.price()
        t.model.salePrice()
        t.model.sku()
        t.model.subCatagory()
        t.model.unit()
        t.model.discount()
        t.model.description()
        t.model.productImage()
        t.model.product_thumbnail()
        t.model.seoTags()
        t.model.slug()
        t.model.status()
        t.model.variants()
    },
})

export const Cart = objectType({
    name : "Cart",
    definition(t){
        t.model.id()
        t.model.User()
        t.model.Products()
        t.model.userId()
        
    }
})

export const cartIteams = objectType({
    name:"CartIteam",
    definition(t){
        t.model.id()
        t.model.Products()
        t.model.quantity()
    }
    
})


export const ProductEnquerie = objectType({
    name : "Product_Enquerie",
    definition(t){
        t.model.id()
        t.model.address()
        t.model.company_name()
        t.model.country()
        t.model.email()
        t.model.EnquiredProducts()
        t.model.phoneNumber()
        t.model.state()
        t.model.unit()
        t.model.orderFrequency()
    }
})

export const EnquiredProducts = objectType({
    name : "enquiredProducts",
    definition(t){
        t.model.id()
        t.model.productname()
        t.model.quantity()
    }
})