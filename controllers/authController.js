const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbconnection = require('../utils/dbconn');
require("dotenv").config()

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const sql = 'SELECT * FROM users WHERE username = ?';
        await dbconnection.query(sql, [username], async (err, results) => {
            if (err) {
                res.status(404).json({ error: err.message });
            } else {
                if (results.length === 0) {
                    res.status(401).json({ error: 'Invalid credentials' });
                } else {
                    const user = results[0];
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        res.status(401).json({ error: 'Invalid credentials' });
                    } else {
                        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
                        
                        res.cookie("token", token).status(200).json({ success: true, token });
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await dbconnection.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ success: true, message: 'User created successfully' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const renderLogin = (req, res) => {
    res.render('login');
}

const renderSignup = (req, res) => {
    res.render('signup');
}

module.exports = { login, signup, renderLogin, renderSignup };