const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'njk');

const checkAgeParamMiddlewave = (req, res, next) => {
  if (!req.query.age) res.redirect('/');
  else next();
};

app.get('/', (req, res) => {
  return res.render('index');
});

app.post('/check', (req, res) => {
  const age = req.body.age;

  if (age >= 18) res.redirect(`/major?age=${req.body.age}`);
  else res.redirect(`/minor?age=${req.body.age}`);
});

app.get('/major', checkAgeParamMiddlewave, (req, res) => {
  return res.render('major', {age: req.query.age});
});

app.get('/minor', checkAgeParamMiddlewave, (req, res) => {
  return res.render('minor', {age: req.query.age});
});

app.listen(3000);
