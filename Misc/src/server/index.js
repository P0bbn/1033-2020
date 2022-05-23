const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- Query 1 (Country) ---- */
app.get('/query1', routes.query1);

/* ---- Query 2 (Country) ---- */
app.get('/query2', routes.query2);

/* ---- Query 3 (Country) ---- */
app.get('/query3', routes.query3);

/* ---- Query 4 (Country) ---- */
app.get('/query4', routes.query4);

/* ---- Query 5 (Country) ---- */
app.get('/query5', routes.query5);

/* ---- Query 6 (State) ---- */
app.get('/query6/:state', routes.query6);

/* ---- Query 7 (State) ---- */
app.get('/query7/:state', routes.query7);

/* ---- Query 8 (County) ---- */
app.get('/query8/:city/:state', routes.query8);

/* ---- Query 9a (Newer) ---- */
app.get('/query9a', routes.query9a);

/* ---- Query 9b (Newer) ---- */
app.get('/query9b', routes.query9b);

/* ---- Query 9c (Newer) ---- */
app.get('/query9c', routes.query9c);

/* ---- Query 10a (Newer) ---- */
app.get('/query10a', routes.query10a);

/* ---- Query 10b (Newer) ---- */
app.get('/query10b', routes.query10b);

/* ---- Query 10c (Newer) ---- */
app.get('/query10c', routes.query10c);

/* ---- Query 10d (Newer) ---- */
app.get('/query10d', routes.query10d);

/* ---- Query 11 (Newer) ---- */
app.get('/query11', routes.query11);

/* ---- Query 12a (Newest) ---- */
app.get('/query12a', routes.query12a);

/* ---- Query 12b (Newest) ---- */
app.get('/query12b', routes.query12b);

/* ---- Query 12c (Newest) ---- */
app.get('/query12c', routes.query12c);

/* ---- Query 12d (Newest) ---- */
app.get('/query12d', routes.query12d);

/* ---- Query 13a (Newest) ---- */
app.get('/query13a', routes.query13a);

/* ---- Query 13b (Newest) ---- */
app.get('/query13b', routes.query13b);

/* ---- Query 13c (Newest) ---- */
app.get('/query13c', routes.query13c);

/* ---- Query 13d (Newest) ---- */
app.get('/query13d', routes.query13d);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});