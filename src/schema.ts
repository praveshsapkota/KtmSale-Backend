import { makeSchema } from '@nexus/schema'
import { join } from 'path'




export const schema = makeSchema({
  types: [], // 1
  outputs: {
    typegen: join(__dirname, '..', '/generated/nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', '/generated/schema.graphql'), // 3
  },
})
