require('dotenv').config();
const express = require('express'); // commonjs 
const app = express() // app express
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const webRoutes = require('./routes/web');
app.use('/', webRoutes);
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);

const port = process.env.PORT || 8888; 
const hostname = process.env.HOST_NAME;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})