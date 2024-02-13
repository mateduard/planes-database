const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test',
});
router.use(express.json());


router.get('/addForm', (req, res) => {
  const q = 'SELECT idCompany, nameCompany FROM companies';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = router;
