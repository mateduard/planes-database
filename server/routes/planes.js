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

router.get('/', (req, res) => {
  const q = 'SELECT planes.id, planes.model, planes.manufact, companies.nameCompany, planes.hours, planes.photo FROM planes LEFT JOIN companies ON planes.codeCompany= companies.idCompany';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get('/:planeId', (req, res) => {
  const q = 'SELECT planes.id, planes.model, planes.manufact, companies.nameCompany, planes.hours, planes.photo, planes.codeCompany FROM planes LEFT JOIN companies ON planes.codeCompany= companies.idCompany WHERE planes.id = (?)';
  const planeId = req.params.planeId;
  db.query(q, planeId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post('/', (req, res) => {
  const q =
    'INSERT INTO planes (`model`, `manufact`, `codeCompany`,`hours`, `photo`) VALUES (?)';
    console.log(req.body);
  const values = [
    req.body.model,
    req.body.manufact,
    req.body.codeCompany,
    req.body.hours,
    req.body.photo,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Plane created.');
  });
});

router.put('/', (req, res) => {
  const planeId = req.body.id;
  console.log(req.body);
  const q =
    'UPDATE `test`.`planes` SET `model` = (?), `manufact` = (?), `codeCompany` = (?), `hours` = (?), `photo` = (?) WHERE (`id` = (?))';
  const values = [
    req.body.model,
    req.body.manufact,
    req.body.codeCompany,
    req.body.hours,
    req.body.photo,
  ];
  db.query(q, [...values, planeId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Plane updated.');
  });
});

router.delete('/:planeId', (req, res) => {
  const planeId = req.params.planeId;
  const q = 'DELETE FROM `test`.`planes` WHERE (`id` = (?) )';
  db.query(q, planeId, (err, data) => {
    if (err) return res.json(err);
    return res.json('Plane deleted.');
  });
});

module.exports = router;
