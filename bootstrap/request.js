const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = (app) => {
    //TODO :: CORS
    app.use(cors({origin: true, credentials: true}));

    //Secure app By Helmet
    app.use(helmet());

    //Some main express configs
    app.use(express.static('public'));


    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));

    //Log requests with morgan
    app.use(morgan("dev"));
}
