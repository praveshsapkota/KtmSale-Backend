
import { nonNull, objectType, list } from 'nexus'
import { GraphQLUpload } from "graphql-upload"

export const Category = objectType({
    name: 'Category',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.slug()
        t.model.sub_Catagory()
        t.model.catagoryImage()
        t.model.status()
        t.model.seoTags()
    },
})

export const SubCatagory = objectType({
    name: "sub_catagory",
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.slug()
        t.model.subCatagoryImage()
        t.model.Catagory()
        t.model.status()
        t.model.seoTags()
        t.model.Products()
        // t.model.Products()
    }
})
