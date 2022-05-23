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




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
/* ---- Query 2 (Country) ---- */
app.get('/country/query1', routes.getQuery1);

/* ---- Query 2 (Country) ---- */
app.get('/country/query2', routes.getQuery2);

/* ---- Query 3 (Country) ---- */
app.get('/country/query3', routes.getQuery3);

/* ---- Query 4 (Country) ---- */
/* Returns the 10 most recent events 
where at least one fatality occurred. 
A description of the event is included.*/ 
app.get('/country/query4', routes.getQuery4);

/* ---- Query 5 (Country) ---- 
 Returns the number of protests 
 per day for the entire country. 
 This and other simple aggregate 
 data can be graphed at either 
 the country or state level.*/
app.get('/query5', routes.getQuery5);

/* ---- Query 5b (State) ---- 
 Gets States.*/
app.get('/states/query5b', routes.getQuery5b);

/* ---- Query 6 (State) ----  
Returns a demographic breakdown of 
the 10 highest population counties 
in a particular state.*/
app.get('/states/query6/:state', routes.getQuery6);

/* ---- Query 7 (State) ---- 
Returns the 10 most recent events 
in a particular state. A description 
of the event is included.
*/
app.get('/states/query7/:state', routes.getQuery7);

/* ---- Query 8 (County) ---- 
 Returns a demographic breakdown of 
 a particular county and the 10 most 
 similar counties based on user 
 selected county/attribute pair. 
 This similarity metric can be made 
 more complex by considering multiple 
 attributes.*/
app.get('/counties/query8/:city/:state', routes.getQuery8);

/* ---- Query 8b (Counties) ---- 
Get Counties */
app.get('/counties/query8b/:state', routes.getQuery8b);

/* ---- Query 9a (State) ---- 
 Events per state per day*/
app.get('/states/query9a/:state', routes.getQuery9a);

/* ---- Query 9b (State) ---- 
Protests per state per day*/
app.get('/states/query9b/:state', routes.getQuery9b);

/* ---- Query 9c (State) ---- 
 Riots per state per day*/
app.get('/states/query9c/:state', routes.getQuery9c);

/* ---- Query 10a (Newer) ---- 
 In all counties where the 
 Hispanic/Black/Native/Asian/Pacific 
 population is >= 50% of the county's 
 total population, what are the 10 
 most requested 1033 items?*/
app.get('/race/query10a', routes.getQuery10a);

/* ---- Query 10b (Newer) ---- 
In counties where the white population
 is >= 50% of the county's total 
 population, what are the 10 most 
 requested 1033 items?
*/
app.get('/race/query10b', routes.getQuery10b);

/* ---- Query 10c (Newer) ---- 
10 most requested 1033 items in 
counties with: Poverty rates in 
the lowest 10% nationwide
*/
app.get('/income/query10c', routes.getQuery10c);

/* ---- Query 10d (Newer) ---- 
10 most requested 1033 items in counties 
with: Poverty rates in the highest 10%
 nationwide*/
app.get('/income/query10d', routes.getQuery10d);

/* ---- Query 11 (Newer) ---- 
In counties where the 
Hispanic/Black/Native/Asian/Pacific 
population is >= 50% of the county's 
total population, what is the average 
value of 1033 equipment requested per
resident? How does this compare with 
the national average?*/
app.get('/race/query11', routes.getQuery11);

/* ---- Query 12a (Newest) ---- 
 Events per capita vs. poverty rate for 
 counties with >=100K total_pop*/
app.get('/income/query12a', routes.getQuery12a);

/* ---- Query 12b (Newest) ---- 
Events per capita vs. % white for counties 
with >=100K total_pop*/
app.get('/race/query12b', routes.getQuery12b);

/* ---- Query 12c (Newest) ---- 
 Item cost per capita vs. poverty 
 rate for counties with >=100K 
 total_pop 
*/
app.get('/income/query12c', routes.getQuery12c);

/* ---- Query 12d (Newest) ---- 
Item cost per capita vs. % white 
for counties with >=100K total_pop
*/
app.get('/race/query12d', routes.getQuery12d);

/* ---- Query 13a (Newest) ---- 
Events per capita vs. poverty rate, 
aggregated to nearest 5%*/
app.get('/income/query13a', routes.getQuery13a);

/* ---- Query 13b (Newest) ---- 
Events per capita vs. % white, 
aggregated to nearest 5%
*/
app.get('/race/query13b', routes.getQuery13b);

/* ---- Query 13c (Newest) ---- 
Item cost per capita vs. poverty rate, 
aggregated to nearest 5%
*/
app.get('/income/query13c', routes.getQuery13c);

/* ---- Query 13d (Newest) ---- 
Item cost per capita vs. % white, 
aggregated to nearest 5%*/
app.get('/race/query13d', routes.getQuery13d);





app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});