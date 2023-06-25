const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();  
//shouldn't matter but testing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API Server Running on  ${PORT}`);
    });
});