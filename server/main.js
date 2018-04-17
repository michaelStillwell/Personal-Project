require('dotenv').config();
const
    {
        CONNECTION_STRING,
        PORT
    } = process.env,
    massive = require('massive'),
    express = require('express'),
    app = express(),
    cors = require('cors'),
    { json } = require('body-parser'),
    port = PORT || 3223,
    
    { 
        buildSchema,
        GraphQLList
    } = require('graphql'),
    graphqlHTTP = require('express-graphql'),
    pgp = require('pg-promise')(),
    db = pgp(CONNECTION_STRING);
    // schema = require('./schema');

// massive(CONNECTION_STRING)
//     .then(dbInstance => app.set('db', dbInstance))
//     .catch(err => console.log('MASSIVE ERROR:', err));

const schema = buildSchema(`
    type Employee {
        id: ID
        username: String
        password: String
        emp_type: String
    }

    type Product {
        id: ID
        name: String
        description: String
        price: Float
        stock: Int
    }

    type Order {
        product: [Product]
    }

    input ProductInput {
        name: String
        description: String
        price: Float
        stock: Int
    }

    input EmployeeInput {
        username: String
        password: String
        emp_type: String
    }

    type Query {
        getEmployee(id: ID!): Employee
        getAllEmployees: [Employee]
        getProduct(id: ID!): Product
        getAllProducts: [Product]
        getOrder(id: ID!): Order
    }

    type Mutation {
        createProduct(input: ProductInput): [Product]
        updateProduct(id: ID!, input: ProductInput): [Product]
        deleteProduct(id: ID!): [Product]
        createEmployee(input: EmployeeInput): [Employee]
        updateEmployee(id: ID!, input: EmployeeInput): [Employee]
        deleteEmployee(id: ID!): [Employee]
    }
`);

class Employee {
    constructor(id, username, password, emp_type) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.emp_type = emp_type;
    }
};

class Product {
    constructor(id, name, description, price, stock) {
        this.id = id, 
        this.name = name, 
        this.description = description, 
        this.price = price, 
        this.stock = stock
    }
};

class Order {
    constructor(product) {
        this.product = product
    }
};

const root = {
    getEmployee: ({id}) => {
        return db.any(`SELECT * FROM employee WHERE id = ${id}`)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('GET EMPLOYEE ERROR: ', err));
    },
    getAllEmployees: () => {
        return db.any(`SELECT * FROM employee`)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('GET ALL EMPLOYEES ERROR: ', err));
    },
    createEmployee: (arg) => {
        return db.any(`
                INSERT INTO employee (username, password, emp_type) VALUES ('${arg.input.username}', '${arg.input.password}', '${arg.input.emp_type}');
                SELECT * FROM employee;
            `)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('EMPLOYEE ERROR: ', err))
    },
    updateEmployee: (arg) => {
        return db.any(`
                UPDATE employee SET username = '${arg.input.username}', password = '${arg.input.password}', emp_type = '${arg.input.emp_type}' WHERE id = ${arg.id};
                SELECT * FROM employee WHERE id = ${arg.id}
            `)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('EMPLOYEE ERROR: ', err))
    },
    deleteEmplooyee: ({id}) => {
        return db.any(`
                DELETE FROM employee WHERE id = ${id};
                SELECT FROM employee;
            `)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('EMPLOYEE ERROR: ', err))
    },
    getProduct: ({id}) => {
        return db.any(`SELECT * FROM product WHERE id = ${id}`)
            .then(info => info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock)))
            .catch(err => console.log('GET PRODUCT ERROR: ', err));
    },
    getAllProducts: () => {
        return db.any(`SELECT * FROM product`)
            .then(info => info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock)))
            .catch(err => console.log('GET ALL PRODUCTS ERROR: ', err));
    },
    createProduct: (arg) => {
        return db.any(`
                INSERT INTO product (name, description, price, stock) VALUES ('${arg.input.name}', '${arg.input.description}', ${arg.input.price}, ${arg.input.stock});
                SELECT * FROM product;
            `)
            .then(info => info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock)))
            .catch(err => console.log('CREATE PRODUCT ERROR: ', err));
    },
    updateProduct:(arg) => {
        return db.any(`
                UPDATE product SET name = '${arg.input.name}', description = '${arg.input.description}', price = ${arg.input.price}, stock = ${arg.input.stock} WHERE id = ${arg.id};
                SELECT * FROM product WHERE id = ${arg.id}
            `)
            .then(info => info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock)))
            .catch(err => console.log('UPDATE PRODUCT ERROR: ', err))
    },
    deleteProduct:({id}) => {
        return db.any(`
                DELETE FROM product WHERE id = ${id};
                SELECT * FROM product;
            `)
            .then(info => {
                console.log(info);
                return info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock));
            })
            .catch(err => console.log('DELETE PRODUCT ERROR: ', err));
    },
    getOrder: ({id}) => {
        return db.any(`SELECT * FROM emp_order WHERE order_id = ${id}`)
            .then(info => new Order(info.map(x => new Product(x.id, x.name, x.description, x.price, x.stock))))
            .catch(err => console.log('GET ORDER: ', err));
    },
};

app.use('/', cors(), json(), graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

// app.use(cors());

app.listen(port, () => console.log(`Listening to port ${port} radio`));