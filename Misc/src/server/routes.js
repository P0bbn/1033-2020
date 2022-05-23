var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Query 1 (Country) ---- */
function query1(req, res) {
  var query = `
    WITH d1 AS (SELECT "United States" AS country, SUM(total_pop) AS population FROM demographic),
    p1 AS (SELECT COUNT(*) AS peaceful FROM protest WHERE sub_event_type="Peaceful protest"),
    p2 AS (SELECT COUNT(*) AS non_peaceful FROM protest WHERE event_type<>"Strategic Developments" AND sub_event_type<>"Peaceful protest"),
    p3 AS (SELECT COUNT(*) AS num_fatalities FROM protest WHERE event_type<>"Strategic Developments" AND fatalities>0),
    e1 AS (SELECT SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost FROM equipment WHERE item_type<>"WEAPON"),
    e2 AS (SELECT SUM(quantity) AS weapon_qty, SUM(total_cost) AS weapon_cost FROM equipment WHERE item_type="WEAPON")
    SELECT country, population, peaceful, non_peaceful, num_fatalities AS "fatalities", ROUND((peaceful/population*100000),2) AS peaceful_per_100K, ROUND((non_peaceful/population*100000),2) AS non_peaceful_per_100K, equip_qty, weapon_qty, equip_cost, weapon_cost, ROUND((equip_cost/equip_qty),2) AS cost_per_equip, ROUND((weapon_cost/weapon_qty),2) AS cost_per_weapon, ROUND((equip_cost/population),2) AS equip_cost_per_cap, ROUND((weapon_cost/population),2) AS weapon_cost_per_cap FROM d1, p1, p2, p3, e1, e2;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 2 (Country) ---- */
function query2(req, res) {
  var query = `
    WITH d1 AS (SELECT state, SUM(total_pop) AS population FROM demographic d JOIN county c ON d.county_id=c.county_id GROUP BY state),
    p1 AS (SELECT state, COUNT(*) AS peaceful FROM protest p JOIN county c ON p.county_id=c.county_id WHERE sub_event_type="Peaceful protest" GROUP BY state),
    p2 AS (SELECT state, COUNT(*) AS non_peaceful FROM protest p JOIN county c ON p.county_id=c.county_id WHERE event_type<>"Strategic Developments" AND sub_event_type<>"Peaceful protest" GROUP BY state),
    e1 AS (SELECT state, SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost FROM equipment e JOIN county c ON e.county_id=c.county_id WHERE item_type<>"WEAPON" GROUP BY state),
    e2 AS (SELECT state, SUM(quantity) AS weapon_qty, SUM(total_cost) AS weapon_cost FROM equipment e JOIN county c ON e.county_id=c.county_id WHERE item_type="WEAPON" GROUP BY state)
    SELECT d1.state, population, peaceful, non_peaceful, ROUND((peaceful/population*100000),2) AS peaceful_per_100K, ROUND((non_peaceful/population*100000),2) AS non_peaceful_per_100K, equip_qty, weapon_qty, equip_cost, weapon_cost, ROUND((equip_cost/equip_qty),2) AS cost_per_equip, ROUND((weapon_cost/weapon_qty),2) AS cost_per_weapon, ROUND((equip_cost/population),2) AS equip_cost_per_cap, ROUND((weapon_cost/population),2) AS weapon_cost_per_cap FROM d1 LEFT OUTER JOIN p1 on d1.state=p1.state LEFT OUTER JOIN p2 on d1.state=p2.state LEFT OUTER JOIN e1 ON d1.state=e1.state LEFT OUTER JOIN e2 ON d1.state=e2.state;  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 3 (Country) ---- */
function query3(req, res) {
  var query = `
    WITH p1 AS (SELECT event_type, sub_event_type, COUNT(*) AS count FROM protest GROUP BY event_type, sub_event_type ORDER BY count DESC)
    SELECT * FROM p1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 4 (Country) ---- */
function query4(req, res) {
  var query = `
    WITH p1 AS (SELECT event_date, event_type, sub_event_type, notes, fatalities FROM protest WHERE fatalities>0 ORDER BY event_date DESC LIMIT 10)
    SELECT * FROM p1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 5 (Country) ---- */
function query5(req, res) {
  var query = `
    WITH p1 AS (SELECT event_date, COUNT(*) AS num_events FROM protest GROUP BY event_date ORDER BY event_date)
    SELECT * FROM p1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 6 (State) ---- */
function query6(req, res) {
  var state = (req.params.state).substring(1);

  var query = `
    WITH d1 AS (SELECT c.county_id, county, total_pop AS population, income_per_cap, poverty, unemployment FROM demographic d JOIN county c ON d.county_id=c.county_id WHERE state="${state}" GROUP BY county_id),
    p1 AS (SELECT c.county_id, COUNT(*) AS num_events FROM protest p JOIN county c ON p.county_id=c.county_id WHERE state="${state}" GROUP BY county_id),
    e1 AS (SELECT c.county_id, SUM(quantity) AS item_qty, SUM(total_cost) AS item_cost FROM equipment e JOIN county c ON e.county_id=c.county_id WHERE state="${state}" GROUP BY county_id)
    SELECT county, population, income_per_cap, poverty, unemployment, num_events AS "events", ROUND((num_events/population*100000),2) AS events_per_100K, item_qty, item_cost, ROUND((item_cost/item_qty),2) AS cost_per_item, ROUND((item_cost/population),2) AS cost_per_cap FROM d1 LEFT OUTER JOIN p1 ON d1.county_id=p1.county_id LEFT OUTER JOIN e1 on e1.county_id=d1.county_id ORDER BY population DESC LIMIT 10;  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 7 (State) ---- */
function query7(req, res) {
  var state = (req.params.state).substring(1);

  var query = `
WITH p1 AS (SELECT event_date, event_type, sub_event_type, notes, fatalities FROM protest p JOIN county c ON p.county_id=c.county_id WHERE state="${state}" ORDER BY event_date DESC LIMIT 10)
SELECT * FROM p1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 8 (County) ---- */
function query8(req, res) {
  var city = (req.params.city).substring(1);
  var state = (req.params.state).substring(1);

  var query = `
    WITH d1 AS (SELECT c.county_id, state, county, total_pop AS population, income_per_cap, poverty, unemployment FROM demographic d JOIN county c ON d.county_id=c.county_id GROUP BY county_id),
    p1 AS (SELECT c.county_id, COUNT(*) AS num_events FROM protest p JOIN county c ON p.county_id=c.county_id GROUP BY county_id),
    e1 AS (SELECT c.county_id, SUM(quantity) AS item_qty, SUM(total_cost) AS item_cost FROM equipment e JOIN county c ON e.county_id=c.county_id GROUP BY county_id),
    o1 AS (SELECT d1.county_id, population, income_per_cap, poverty, unemployment, num_events, (num_events/population*100000) AS events_per_100K, item_qty, item_cost, (item_cost/population) AS item_cost_per_cap FROM d1 LEFT OUTER JOIN e1 ON d1.county_id=e1.county_id LEFT OUTER JOIN p1 on p1.county_id=d1.county_id WHERE state="${state}" AND county="${city}")
    SELECT county, state, population, income_per_cap, poverty, unemployment, num_events AS "events", ROUND((num_events/population*100000),2) AS events_per_100K, item_qty, item_cost, ROUND((item_cost/item_qty),2) AS cost_per_item, ROUND((item_cost/population),2) AS cost_per_cap FROM d1 LEFT OUTER JOIN p1 ON d1.county_id=p1.county_id LEFT OUTER JOIN e1 on d1.county_id=e1.county_id ORDER BY ABS((SELECT population FROM o1) - population) LIMIT 11;  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 9a (Newer) ---- */
function query9a(req, res) {
  var state = (req.params.state).substring(1);

  var query = `
    WITH date1 AS (SELECT DISTINCT event_date FROM protest),
    p1 AS (SELECT event_date, COUNT(*) AS num_events FROM protest p JOIN county c ON p.county_id=c.county_id WHERE state="${state}" GROUP BY event_date),
    p2 AS (SELECT date1.event_date, IFNULL(num_events,0) AS num_events FROM date1 LEFT OUTER JOIN p1 ON date1.event_date=p1.event_date GROUP BY date1.event_date ORDER BY date1.event_date)
    SELECT * FROM p2;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 9b (Newer) ---- */
function query9b(req, res) {
  var state = (req.params.state).substring(1);

  var query = `
    WITH date1 AS (SELECT DISTINCT event_date FROM protest),
    p1 AS (SELECT event_date, COUNT(*) AS num_events FROM protest p JOIN county c ON p.county_id=c.county_id WHERE state="${state}" AND event_type="Protests" GROUP BY event_date),
    p2 AS (SELECT date1.event_date, IFNULL(num_events,0) AS num_protests FROM date1 LEFT OUTER JOIN p1 ON date1.event_date=p1.event_date GROUP BY date1.event_date ORDER BY date1.event_date)
    SELECT * FROM p2;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 9c (Newer) ---- */
function query9c(req, res) {
  var state = (req.params.state).substring(1);

  var query = `
    WITH date1 AS (SELECT DISTINCT event_date FROM protest),
    p1 AS (SELECT event_date, COUNT(*) AS num_events FROM protest p JOIN county c ON p.county_id=c.county_id WHERE state="${state}" AND event_type="Riots" GROUP BY event_date),
    p2 AS (SELECT date1.event_date, IFNULL(num_events,0) AS num_riots FROM date1 LEFT OUTER JOIN p1 ON date1.event_date=p1.event_date GROUP BY date1.event_date ORDER BY date1.event_date)
    SELECT * FROM p2;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 10a (Newer) ---- */
function query10a(req, res) {
  var query = `
    WITH d1 AS (SELECT county_id FROM demographic WHERE (hispanic+black+native+asian+pacific)>white),
    e1 AS (SELECT nsn, item_name, SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost, ROUND((total_cost/quantity),2) AS cost_per_item FROM equipment e JOIN d1 ON e.county_id=d1.county_id GROUP BY nsn, item_name ORDER BY equip_qty DESC LIMIT 10)
    SELECT * FROM e1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 10b (Newer) ---- */
function query10b(req, res) {
  var query = `
    WITH d1 AS (SELECT county_id FROM demographic WHERE (hispanic+black+native+asian+pacific)<=white),
    e1 AS (SELECT nsn, item_name, SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost, ROUND((total_cost/quantity),2) AS cost_per_item FROM equipment e JOIN d1 ON e.county_id=d1.county_id GROUP BY nsn, item_name ORDER BY equip_qty DESC LIMIT 10)
    SELECT * FROM e1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 10c (Newer) ---- */
function query10c(req, res) {
  var query = `
    WITH d1 AS (SELECT county_id FROM demographic ORDER BY poverty LIMIT 322),
    e1 AS (SELECT nsn, item_name, SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost, ROUND((total_cost/quantity),2) AS cost_per_item FROM equipment e JOIN d1 ON e.county_id=d1.county_id GROUP BY nsn, item_name ORDER BY equip_qty DESC LIMIT 10)
    SELECT * from e1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 10d (Newer) ---- */
function query10d(req, res) {
  var query = `
    WITH d1 AS (SELECT county_id FROM demographic ORDER BY poverty DESC LIMIT 322),
    e1 AS (SELECT nsn, item_name, SUM(quantity) AS equip_qty, SUM(total_cost) AS equip_cost, ROUND((total_cost/quantity),2) AS cost_per_item FROM equipment e JOIN d1 ON e.county_id=d1.county_id GROUP BY nsn, item_name ORDER BY equip_qty DESC LIMIT 10)
    SELECT * from e1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 11 (Newer) ---- */
function query11(req, res) {
  var query = `
    WITH p1 AS (SELECT COUNT(*) AS num_events FROM protest),
    pop1 AS (SELECT SUM(total_pop) AS population FROM demographic),
    e1 AS (SELECT SUM(total_cost) AS item_cost FROM equipment),
    d2 AS (SELECT county_id, total_pop FROM demographic WHERE (hispanic+black+native+asian+pacific)<=white),
    p2 AS (SELECT COUNT(*) AS num_events FROM protest p JOIN d2 ON p.county_id=d2.county_id),
    pop2 AS (SELECT SUM(total_pop) AS population FROM d2),
    e2 AS (SELECT SUM(total_cost) AS item_cost FROM equipment e JOIN d2 ON e.county_id=d2.county_id),
    d3 AS (SELECT county_id, total_pop FROM demographic WHERE (hispanic+black+native+asian+pacific)>white),
    p3 AS (SELECT COUNT(*) AS num_events FROM protest p JOIN d3 ON p.county_id=d3.county_id),
    pop3 AS (SELECT SUM(total_pop) AS population FROM d3),
    e3 AS (SELECT SUM(total_cost) AS item_cost FROM equipment e JOIN d3 ON e.county_id=d3.county_id),
    d4 AS (SELECT county_id, total_pop FROM demographic ORDER BY poverty LIMIT 322),
    p4 AS (SELECT COUNT(*) AS num_events FROM protest p JOIN d4 ON p.county_id=d4.county_id),
    pop4 AS (SELECT SUM(total_pop) AS population FROM d4),
    e4 AS (SELECT SUM(total_cost) AS item_cost FROM equipment e JOIN d4 ON e.county_id=d4.county_id),
    d5 AS (SELECT county_id, total_pop FROM demographic ORDER BY poverty DESC LIMIT 322),
    p5 AS (SELECT COUNT(*) AS num_events FROM protest p JOIN d5 ON p.county_id=d5.county_id),
    pop5 AS (SELECT SUM(total_pop) AS population FROM d5),
    e5 AS (SELECT SUM(total_cost) AS item_cost FROM equipment e JOIN d5 ON e.county_id=d5.county_id)
    SELECT ROUND((p1.num_events/pop1.population*100000),2) AS events_per_100K_national, ROUND((p2.num_events/pop2.population*100000),2) AS white, ROUND((p3.num_events/pop3.population*100000),2) AS non_white, ROUND((p4.num_events/pop4.population*100000),2) AS low_poverty, ROUND((p5.num_events/pop5.population*100000),2) AS high_poverty, ROUND((e1.item_cost/pop1.population),2) AS item_cost_per_cap_national, ROUND((e2.item_cost/pop2.population),2) AS white, ROUND((e3.item_cost/pop3.population),2) AS non_white, ROUND((e4.item_cost/pop4.population),2) AS low_poverty, ROUND((e5.item_cost/pop5.population),2) AS high_poverty FROM p1, pop1, e1, p2, pop2, e2, p3, pop3, e3, p4, pop4, e4, p5, pop5, e5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 12a (Newest) ---- */
function query12a(req, res) {
  var query = `
    WITH p1 AS (SELECT county_id, COUNT(*) AS num_events FROM protest GROUP BY county_id),
    d1 AS (SELECT poverty, ROUND((num_events/total_pop*100000),2) AS events_per_capita FROM demographic d JOIN p1 ON d.county_id=p1.county_id WHERE total_pop>=100000)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 12b (Newest) ---- */
function query12b(req, res) {
  var query = `
    WITH p1 AS (SELECT county_id, COUNT(*) AS num_events FROM protest GROUP BY county_id),
    d1 AS (SELECT white, ROUND((num_events/total_pop*100000),2) AS events_per_capita FROM demographic d JOIN p1 ON d.county_id=p1.county_id WHERE total_pop>=100000)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 12c (Newest) ---- */
function query12c(req, res) {
  var query = `
    WITH e1 AS (SELECT county_id, SUM(total_cost) AS total_cost FROM equipment GROUP BY county_id),
    d1 AS (SELECT poverty, ROUND((total_cost/total_pop),2) AS cost_per_capita FROM demographic d JOIN e1 ON d.county_id=e1.county_id WHERE total_pop>=100000)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 12d (Newest) ---- */
function query12d(req, res) {
  var query = `
    WITH e1 AS (SELECT county_id, SUM(total_cost) AS total_cost FROM equipment GROUP BY county_id),
    d1 AS (SELECT white, ROUND((total_cost/total_pop),2) AS cost_per_capita FROM demographic d JOIN e1 ON d.county_id=e1.county_id WHERE total_pop>=100000)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 13a (Newest) ---- */
function query13a(req, res) {
  var query = `
    WITH p1 AS (SELECT county_id, COUNT(*) AS num_events FROM protest GROUP BY county_id),
    d1 AS (SELECT (ROUND(poverty/0.5,-1)*0.5) AS poverty_rounded, IFNULL(ROUND((SUM(num_events)/SUM(total_pop)*100000),2),0) AS events_per_100K FROM demographic d LEFT OUTER JOIN p1 ON d.county_id=p1.county_id GROUP BY poverty_rounded)
    SELECT * FROM d1 ORDER BY poverty_rounded;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 13b (Newest) ---- */
function query13b(req, res) {
  var query = `
    WITH p1 AS (SELECT county_id, COUNT(*) AS num_events FROM protest GROUP BY county_id),
    d1 AS (SELECT (ROUND(white/0.5,-1)*0.5) AS white_rounded, IFNULL(ROUND((SUM(num_events)/SUM(total_pop)*100000),2),0) AS events_per_100K FROM demographic d LEFT OUTER JOIN p1 ON d.county_id=p1.county_id GROUP BY white_rounded ORDER BY white_rounded)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 13c (Newest) ---- */
function query13c(req, res) {
  var query = `
    WITH e1 AS (SELECT county_id, SUM(total_cost) AS total_cost FROM equipment GROUP BY county_id),
    d1 AS (SELECT (ROUND(poverty/0.5,-1)*0.5) AS poverty_rounded, IFNULL(ROUND((SUM(total_cost)/SUM(total_pop)),2),0) AS cost_per_capita FROM demographic d LEFT OUTER JOIN e1 ON d.county_id=e1.county_id GROUP BY poverty_rounded ORDER BY poverty_rounded)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Query 13d (Newest) ---- */
function query13d(req, res) {
  var query = `
    WITH e1 AS (SELECT county_id, SUM(total_cost) AS total_cost FROM equipment GROUP BY county_id),
    d1 AS (SELECT (ROUND(white/0.5,-1)*0.5) AS white_rounded, IFNULL(ROUND((SUM(total_cost)/SUM(total_pop)),2),0) AS cost_per_capita FROM demographic d LEFT OUTER JOIN e1 ON d.county_id=e1.county_id GROUP BY white_rounded ORDER BY white_rounded)
    SELECT * FROM d1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  query1: query1,
  query2: query2,
  query3: query3,
  query4: query4,
  query5: query5,
  query6: query6,
  query7: query7,
  query8: query8,
  query9a: query9a,
  query9b: query9b,
  query9c: query9c,
  query10a: query10a,
  query10b: query10b,
  query10c: query10c,
  query10d: query10d,
  query11: query11,
  query12a: query12a,
  query12b: query12b,
  query12c: query12c,
  query12d: query12d,
  query13a: query13a,
  query13b: query13b,
  query13c: query13c,
  query13d: query13d,
}