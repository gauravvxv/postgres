const middlewareFunc = (req, res, next) => {
    const { fname, lname, email, dept, salary } = req.body;


    if (!fname?.trim() || !lname?.trim() || !email?.trim() || !dept?.trim() || !salary) {
        return res.status(400).json({ error: 'All fields are required and cannot be empty.' });
    }

    next();
};

module.exports = middlewareFunc;
