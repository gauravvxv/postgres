const pool = require("../config/db")

const getEmployees = async (req,res) => {

    try {
        const result = await pool.query('select * from employees');
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error: error})
    }

}

const postEmployees = async (req,res)=> {
    const {fname , lname , email,dept, salary,hire_date} = req.body;

    try {
        let result;
        if(hire_date){
            result = await pool.query('insert into employees (fname,lname,email,dept, salary,hire_date) values ($1,$2,$3,$4,$5,$6) returning *',
                [fname , lname , email, dept, salary, hire_date]
            )
        }
        else{
            result = await pool.query('insert into employees (fname,lname,email,dept, salary) values ($1,$2,$3,$4,$5) returning *',
                [fname , lname , email, dept, salary]
            )
        }

        res.status(201).json({message: "Employees Data is Added", result: result.rows[0]});
    } catch (error) {
        res.status(401).json({error: error})
    }

}

const putEmployees = async (req,res) => {
    const {id} = req.params;
    const {fname, lname, email,dept,salary,hire_date} = req.body;

    try {
        const result = await pool.query(
            `update employees
            set fname = coalesce($1,fname),
            lname = coalesce($2,lname),
            email = coalesce($3,email),
            dept = coalesce($4,dept),
            salary = coalesce($5,salary),
            hire_date = coalesce($6 , hire_date)

            where id = $7 returning *
            `,
            [fname , lname , email,dept,salary,hire_date, id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({error: "Employee not found!"})
        }

        res.status(201).json({message: 'Update Successful'})
    } catch (error) {
        res.status(500).json({error: error})
    }

}


const deleteEmployees = async (req,res) => {
    const {id} = req.params;

    try {
        const result = await pool.query(
            `delete from employees where id = $1 returning *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({error: "Employee not found!"})
        }

        res.status(201).json({message: 'Delete Successful'})
    } catch (error) {
        res.status(500).json({error: error})
    }

}


module.exports = {getEmployees, postEmployees,  putEmployees, deleteEmployees}