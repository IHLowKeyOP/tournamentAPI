const express = require('express');
const userRoutes = express.Router();
const User = require('../models/user')
const passport = require('passport')


module.exports = userRoutes;