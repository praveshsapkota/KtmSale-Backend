import { objectType } from 'nexus'

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
