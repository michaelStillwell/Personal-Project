const 
    { 
        buildSchema,
        GraphQLList
    } = require('graphql'),
    { CONNECTION_STRING } = process.env,
    pgp = require('pg-promise')(),
    db = pgp(CONNECTION_STRING);

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
        amount: Int
    }

    type Order {
        order_id: Int
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
        emp_type: String
    }

    input OrderInput {
        order_id: Int
        product: Int
        employee_id: Int
        num_of_product: Int
        completion: Boolean
    }

    type Query {
        getEmployee(id: ID!): [Employee]
        getAllEmployees: [Employee]
        getProduct(id: ID!): [Product]
        getAllProducts: [Product]
        getAllOrders(id: ID!): Order
    }

    type Mutation {
        login(username: String, password: String): [Employee]
        createProduct(input: ProductInput): [Product]
        updateProduct(id: ID!, input: ProductInput): [Product]
        deleteProduct(id: ID!): [Product]
        createEmployee(input: EmployeeInput): [Employee]
        updateEmployee(id: ID!, input: EmployeeInput): [Employee]
        deleteEmployee(id: ID!): [Employee]
        createOrder(products: [OrderInput]): String
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
    constructor(id, name, description, price, stock, amount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.amount = amount;
    }
};

class Order {
    constructor(order_id, product) {
        this.order_id = order_id;
        this.product = [product];
    }
};

const root = {
    login: (arg) => {
        return db.any(`SELECT * FROM employee WHERE username = '${arg.username}' AND password = '${arg.password}'`)
            .then(info => info.map(x => new Employee(x.id, x.username, x.password, x.emp_type)))
            .catch(err => console.log('AUTH USER ERROR: ', err));
    },
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
    getAllOrders: ({id}) => {
        return db.any(`SELECT * FROM emp_order AS e JOIN product AS p ON p.id = e.product WHERE employee_id = ${id};`)
            .then(info => {
                let a = [];
                info.map(x => {
                    
                });
            })
            .catch(err => console.log('GET ORDER: ', err));
    },
    createOrder: ({products}) => {
        console.log(products)
        products.map(x => db.none(`INSERT INTO emp_order (order_id, product, employee_id, completion, num_of_product) VALUES (
            ${x.order_id}, ${x.product}, ${x.employee_id}, ${x.completion}, ${x.num_of_product});`));
        return 'Finished';
    },
};

module.exports = {schema, root};

// SELECT COUNT(product), product, order_id, employee FROM emp_order WHERE order_id = ${id} GROUP BY product, order_id, employee;
// SELECT COUNT(emp_order.product), emp_order.order_id, emp_order.employee, product.name FROM emp_order 
// JOIN product ON emp_order.product = product.id WHERE order_id = 1 
// GROUP BY emp_order.product, emp_order.order_id, emp_order.employee, product.name;