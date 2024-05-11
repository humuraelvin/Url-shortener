const shortid = require('shortid');
const dbconnection = require('../utils/dbconn');
const Joi = require('joi');

const shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const userId = req.userId;
        const shortId = shortid.generate();

        const schema = Joi.object({
            longUrl: Joi.string().uri().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const sql = 'INSERT INTO shortened_urls (short_id, long_url, user_id) VALUES (?, ?, ?)';
        await dbconnection.query(sql, [shortId, longUrl, userId], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ success: true, shortUrl: `http://elvin.com/${shortId}` });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getHistory = async (req, res) => {
    try {
        const userId = req.userId;
        const sql = 'SELECT * FROM shortened_urls WHERE user_id = ?';
        await dbconnection.query(sql, [userId], (err, results) => {
            if (err) {
                res.status(404).json({ error: err.message });
            } else {
                // res.status(200).json({ success: true, allShortenedUrlsBythisUser: results })
                res.render("view", { isHistory: true, allShortenedUrlsBythisUser:results})
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { shortenUrl, getHistory };