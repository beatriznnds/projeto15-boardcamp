import connection from "../database.js";

export async function getCustomers (req, res) {
    const { cpf } = req.query;
    try {
        if (cpf) {
            const { rows: searchedCustomers } = await connection.query(`SELECT * FROM customers WHERE upper(cpf) LIKE upper($1)`, [(`${cpf}%`)]);
            return res.send(searchedCustomers);
        }
        const { rows: allCustomers } = await connection.query(`SELECT * FROM customers`);
        res.send(allCustomers); 
    } catch (e) {
        res.send().status(500);
    }    
}

export async function getCustomerById (req, res) {
    const { id } = req.params;
    try {
        const { rows: searchedCustomer } = await connection.query(`SELECT * FROM customeres WHERE id = $1`, [id]);
        res.send(searchedCustomer);
    } catch (e) {
        res.send('').status(500);
    }
}

export async function addNewCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (e) {
       res.sendStatus(500);
    }
}

export async function editCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    try {
        await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}