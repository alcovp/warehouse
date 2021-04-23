import createError from 'http-errors';
import path from 'path';
const morgan = require('morgan')
import bodyParser from 'body-parser';
import express from "express";
import session from 'express-session';
import passport from "passport";
import * as i18n from "i18n";

import User from './models/user';

import {authenticationMiddleware} from "./middleware/routes";

import homeRouter from './routes/home';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import usersRouter from './routes/users';
import projectsRouter from './routes/projects';
import locationsRouter from './routes/locations';
import itemsRouter from './routes/items';
import transactionsRouter from './routes/transactions';
import reportsRouter from './routes/reports';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/warehouse', express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'very secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

i18n.configure({
    locales: ['en', 'ru'],
    cookie: 'locales',
    directory: path.join(__dirname, 'locales')
});
app.use(i18n.init);

app.use('/warehouse', homeRouter);
app.use('/warehouse/home', homeRouter);
app.use('/warehouse/register', registerRouter);
app.use('/warehouse/login', loginRouter);
app.use('/warehouse/logout', logoutRouter);
app.use('/warehouse/users', authenticationMiddleware, usersRouter);
app.use('/warehouse/projects', authenticationMiddleware, projectsRouter);
app.use('/warehouse/locations', authenticationMiddleware, locationsRouter);
app.use('/warehouse/items', authenticationMiddleware, itemsRouter);
app.use('/warehouse/transactions', authenticationMiddleware, transactionsRouter);
app.use('/warehouse/reports', authenticationMiddleware, reportsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;