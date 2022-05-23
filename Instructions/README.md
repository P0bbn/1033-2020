This document contains the Instructions and dependency list

#Instructions

##Instructions to start the Webapp:

Since it is built on a very similar framework, you simply need to install the dependencies as we did for HW2.

More specifically, open a Terminal from within the server folder (or cd to that directory) and simply enter `npm install`
Then, open a Terminal in the client folder and enter `npm install` there as well.

Go back to your Terminal in the server folder and enter `npm start`. You should see that the server is listening on a certain port.
Then, go back to the Terminal in the client directory and enter `npm start`. The shell should indicate that it is building the app
at:
http://localhost:3000/

If a browser page does not open up by itself, please open one and go to the above localhost address. Note: if you have anything
else running on either of those Ports, this will not work.




##Instructions for Using the Webapp:

######Home Page:
The Home page is the Country page. The title of the site is called 1033&2020, referencing the datasets we used. On this home page, there will be three sections: a pair of buttons, a map depicting states with protests this year, and below that, a Chart showing the number of protests throughout the year in the US. This last item contains data pulled from Query results. Clicking either of the two buttons at the top will cause tables to appear that contain the specified material. 

######States Page:
On this page you will, at first, just find a dropdown box that has queried the datasets to get all the 50 states + DC and Puerto Rico. After choosing one, you will see a title appear. **You still need to hit the Submit button though!** After that, 3 sections of data should populate: 2 tables and a Chart. If you decide you want to see another state, change the selection in the drop-down and then **double-click the Submit button.** **Please be sure to double click it** Doing so forces the Chart to update to the new state's values. 

######Counties Page:
On this page, you will be able to look at data from 10 counties that are most similar to the one you choose. You will choose a county by first choosing a State from the top dropdown menu and **clicking Submit**. This will cause the second dropdown menu to populate with the Counties in your selected state. Choose a country and **click Submit**. A table will appear showing various data about the selected county and 10 similar ones. 

######Race Page:
Choose an option from either drop down and **Double click** Submit button. Top has tables and the bottom has charts.

######Income Inequality Page:
Choose an option from either drop down and **Double click** Submit button. Top has tables and the bottom has charts.

######About Page:
A small blurb about the aim of our project.

######Source Page:
This is a page where we mention the datasets we used to populate the webapp tables and figures.



#Dependencies:

We used much of the same framework that was used for the webapp HW assignment we had this semester.

######server- 
mysql, express, node.js

######client- 
react, react-chart-js2, chart.js, bootstrap
