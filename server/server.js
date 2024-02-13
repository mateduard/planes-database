const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json('hello this is backend!');
});

const planesRouter = require('./routes/planes');
app.use('/planes', planesRouter);

const companiesRouter = require('./routes/companies');
app.use('/companies', companiesRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
