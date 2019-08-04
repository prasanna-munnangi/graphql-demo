const { GraphQLServer } = require('graphql-yoga')

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphqQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      let returnLink
      links.forEach((link) => {
        if (link.id == args.id) {
          if (args.url) {
            link.url = args.url
          }
          if (args.description) {
            link.description = args.description
          }
          returnLink = link
        }
      })
    return returnLink
    },
    deleteLink: (root, args) => {
      let returnLink
      links.forEach((link, index) => {
        if (link.id == args.id) {
          returnLink = link
          delete links[index]
        }
      })
      return returnLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))