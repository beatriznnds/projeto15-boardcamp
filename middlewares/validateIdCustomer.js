import connection from "../database.js";

export async function validateIdCustomer (req, res, next) {
	const { id } = req.params;
	try {
		const { rows: customer } = await connection.query(
			"SELECT * FROM customers WHERE id = $1", [id]);

		if (customer.length === 0) {
            return res.sendStatus(404);
        } 
		next();
	} catch (e) {
		res.sendStatus(500);
	}
}