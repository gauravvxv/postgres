const express = require('express');
const pool = require('./config/db');
const router = require('./routes/allRoutes');

const app = express();
app.use(express.json());

// app.get('/users', async (req,res)=>{
//     try {
//         const result = await pool.query("select * from employees");
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal error');
//     }
// })

app.use('/', router);

// app.post('/users/add', async (req, res) => {
//     const { fname, lname, email, dept, salary, hire_date } = req.body;

//     if (!fname || !lname || !email || !dept || !salary) {
//         return res.status(400).json({ error: 'Fill all the required fields' });
//     }

//     try {
//         let result;
//         if (hire_date) {
//             result = await pool.query(
//                 "INSERT INTO employees (fname, lname, email, dept, salary, hire_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//                 [fname, lname, email, dept, salary, hire_date]
//             );
//         } else {
//             result = await pool.query(
//                 "INSERT INTO employees (fname, lname, email, dept, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//                 [fname, lname, email, dept, salary]
//             );
//         }

//         res.status(201).json({ message: 'Added', data: result.rows[0] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });

// app.patch('/users/update/:id', async (req, res) => {
//     const { id } = req.params;
//     const { fname, lname, email, dept, salary, hire_date } = req.body;

//     try {
//         const result = await pool.query(
//             `UPDATE employees 
//              SET fname = COALESCE($1, fname), 
//                  lname = COALESCE($2, lname), 
//                  email = COALESCE($3, email), 
//                  dept = COALESCE($4, dept), 
//                  salary = COALESCE($5, salary), 
//                  hire_date = COALESCE($6, hire_date) 
//              WHERE id = $7 RETURNING *`,
//             [fname, lname, email, dept, salary, hire_date, id]
//         );

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "Employee not found" });
//         }

//         res.json({ message: "Employee updated", data: result.rows[0] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal server error");
//     }
// });

// app.delete('/users/delete/:id', async (req,res)=>{
//     const {id} = req.params;

//     try {
//         const result = await pool.query(
//             'delete from employees where id = $1 returning *', [id]
//         )

//         if(result.rows.length === 0){
//             return res.status(404).json({error: 'User Not Found'})
//         }

//         res.json({message: 'Employee deleted', data: result.rows[0]})
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal server error");
//     }
// })

const port = 5000;

app.listen(port, ()=>console.log('server is running'))