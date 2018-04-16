const
    graphql = require('graphql'),
    connectionString = process.env.CONNECTION_STRING,
    pgp = require('pg-promise')(),
    db = pgp(connectionString);

// return db.any(`
//     SELECT
//         o.order_id, o.emp_id,
//         p.name, p.description,
//         p.price, p.stock,
//         o.completion
//     FROM emp_order AS o JOIN product AS p
//     ON p.id = o.product
// `)


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        emp_type: { type: GraphQLString }
    })
});

const Emp_TypeType = new GraphQLObjectType({
    name: 'EmployeeType',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString }
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        order_id: { type: GraphQLInt },
        products: { 
            type: new GraphQLList(ProductType),
            resolve(order) {
                return db.any(`SELECT * FROM product WHERE id = ${order.product}`)
                    .then(product => product)
                    .catch(err => console.log('ORDER PRODUCT ERROR: ', err))
            }
        }
    })
});

const ProductInput = new GraphQLInputObjectType({
    name: 'ProductInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        stock: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allEmployees: {
            type: new GraphQLList(EmployeeType),
            resolve(parentValue, args) {
                return db.any(`SELECT * FROM employee`)
                    .then(info => info)
                    .catch(err => console.log('ALL EMPOYEES ERROR: ', err));
            }
        },
        employee: {
            type: EmployeeType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, args) {
                return db.one(`SELECT * FROM employee WHERE id=${args.id}`)
                    .then(info => info)
                    .catch(err => console.log('EMPLOYEE ERROR: ', err))
            }
        },
        allEmployeeTypes: {
            type: new GraphQLList(Emp_TypeType),
            resolve(parentValue, args) {
                return db.any(`SELECT * FROM employee_type`)
                    .then(info => info)
                    .catch(err => console.log('EMPLOYEE TYPES ERROR: ', err));
            }
        },
        allProducts: {
            type: ProductType,
            resolve(parentValue, args) {
                return db.any(`SELECT * FROM product`)
                    .then(info => info)
                    .catch(err => console.log('ALL PRODTUCS ERROR: ', err));
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, args) {
                return db.one(`SELECT * FROM product WHERE id=${args.id}`)
            }
        },
        allOrders: {
            type: new GraphQLList(OrderType),
            args: { emp_id: { type: GraphQLString }, order_id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return db.any(`SELECT * FROM emp_order WHERE order_id = ${args.order_id}`)
                    .then(info => info)
                    .catch(err => console.log('ALL ORDERS ERROR: ', err));
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})