const express = require('express');
const cors = require('cors');
const passport=require('passport')

require('dotenv').config();


var app = express();
require('./config/passport')(passport)
require('./config/database')
app.use(cors())
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


require('./routes/login.route')(app);
require('./routes/nft.route')(app);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(4000,()=>console.log("server listening on port 4000"));