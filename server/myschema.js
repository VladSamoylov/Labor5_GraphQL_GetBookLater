import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} from 'graphql';

let books = [
    {id : 1, title: "somebook 1", author: "someauthor 1", cover: ""},
    {id : 2, title: "somebook 2", author: "someauthor 2", cover: ""},
    {id : 3, title: "somebook 3", author: "someauthor 3", cover: ""},
    {id : 4, title: "somebook 4", author: "someauthor 4", cover: ""}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString)},
        cover: {type: GraphQLString},
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getBooks: {
            type: GraphQLList(BookType),
            resolve: () => books,
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                author: { type: GraphQLNonNull(GraphQLString)},
                cover: {type: GraphQLString},
            },
            resolve: (_, { title, author, cover }) => {
                const newBook = { 
                    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
                    title, 
                    author, 
                    cover 
                };
                books.push(newBook);
                return newBook;
            },
        },
        removeBook: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, { id }) => {
                books = books.filter(book => book.id !== id);
                return `Book with id: ${id} is removed!`;
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

export default schema;