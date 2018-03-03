const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {basicStrategy, jwtStrategy} = require('./strategies');

const router = express.Router();

const jsonParser = bodyParser.json();

const EntryController = require('./entries');
const UsersController = require('./users');
const AuthController = require('./auth');
const Todo = require('../models/todos');

//Register User
router.post('/register', jsonParser, UsersController.register);

//Login User
router.post('/login', passport.authenticate('basic', {session: false}), AuthController.login);

//Refresh Token
router.post('/refresh', passport.authenticate('jwt', {session: false}), AuthController.refresh);

//Add Entry
router.post('/add', [passport.authenticate('jwt', {session: false}), jsonParser],UsersController.addEntry);

router.get('/todos', (req, res) =>
{
  console.log('something');
  Todo.find()
    .then(todos => res.json(todos.map(todo => todo.serialize())))
    .catch();
});

router.post('/todos', jsonParser, (req, res, next) => {
  console.log(req.body)
  const { title } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  // Using promises
  Todo.create({title})
    .then(newItem => {
      res.status(201)
        .location(`${req.originalUrl}/${newItem.id}`)
        .json(newItem.serialize());
  })
    .catch(next);
});


module.exports = {router, basicStrategy, jwtStrategy};
