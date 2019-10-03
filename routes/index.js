const express = require("express");
const router = express.Router();
const getResults = require('../scraper');
const fs = require('fs');

router.get('/', async (req, res, next) => {
  const result = await getResults();
  let jsonString = JSON.stringify(result).
  replace(/\\r/g, '\r').
  replace(/\\n/g, '');
  const path = `${__dirname}/../../checkstatuspage/public/output.json`;
  fs.writeFileSync(path, jsonString, 'utf-8');
  res.render('index', { title: 'Express' });
});

module.exports = router;
