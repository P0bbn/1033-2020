# Project Title

1033 & 2020



## Description

We are looking to foremost compare conflict and protest data this year in the US
with police data over the last two decades. Through the Department of Defense's
Law Enforcement Support Office (LESO), local and state law enforcement agencies
can request surplus military equipment through LESO’s 1033 Program. This
equipment can range anywhere from popcorn machines to parkas, and from
grenade launchers to mine-resistant armored transportation. Use of this equipment
has been cited as a leading indicator, and perhaps cause, of an increasingly
militaristic mindset amongst America's law enforcement agencies. This “warriors”
mindset was on full display during the Summer of 2020 when overwhelmingly
peaceful protests in response to the murder of George Floyd were met with often
violent responses from the nation’s myriad law enforcement agencies. Our group’s
project seeks to determine whether or not a correlation exists between the use of
1033 equipment in a given county and an increase in the use of force against
protesters in the same county. Users can search for the correlation between these
two factors, as well as demographic information for every county, such as racial
makeup, income, unemployment, and education, for every county in the United
States.
## Overview

### Dependencies

* MySQL for database management
* Amazon AWS RDS for database hosting
* Python/Jupyter Notebook for data cleansing and processing
* MySQL Workbench for data ingestion, schema configuration, and testing
* React.js and Chart.js for front-end development
* Node.js and Express for back-end development

### Application Pages

* Home/Country: The landing page with some country data, protest facts, and links to
get to the other pages.
* State Search/Lookup: The page where you can look up a state, which will call up
the data, charts, and graphs for that state.
* Similar Counties: This is a page where you can search for a county, and it will
populate with the N most similar counties based on population size.
* Demographics: This is a page where you can see demographic information about
the protest and police data in the US.
* Income Inequality: This is a page where you can see socioeconomic information
about the protest and police data in the US.

### Application Features
* Menu bar for navigation
* Drop-down menu for users to select a state
* Drop-down submenu populated with all of the counties in the user-selected
state
* Selecting a given county will take users to a page that displays demographic,
1033 request, and protest data for said county, as well as for the county’s
home state and the nation as a whole, for comparison’s sake. A list of the 10
counties with the most similar population will also be displayed.
* Graphs/charts showing nationwide averages for 1033, demographic, and
protest data
* Dynamic charts that change to match new inputs
* Tables showing different 1033, state, and protest data

## Data

### Sources
* American Community Survey (ACS)
 - https://www.kaggle.com/muonneutrino/us-census-demographic-data
 - The ACS is an ongoing demographics survey conducted by the U.S. Census
Bureau. It gathers information annually from 52 U.S. states and territories. The
data here is taken from the DP03 and DP05 tables of the 2017 ACS 5-year
estimates.
- 3220 rows, 37 columns; 0.6MB; 2017; statistics: 3220 counties, 324473330
people

* General Services Administration (GSA) 1033 Program
 - https://data.world/datasets/1033-program
 - This CSV file represents $1.5B of ~$4.8B distributed by the GSA's 1033
Program, for years 2006-2014. All manner of equipment is here from
helicopters to rifles, with prices, nomenclature, and NSNs. The 1033 Program
allows local and state law enforcement agencies to receive surplus military
equipment from the Department of Defense at little or no cost. Note that the
police departments do not pay for the value of the gear, just the shipping and
storage en route.
 - 243492 rows, 12 columns; 22MB; years 2006–2014

* US Crisis Monitor
 - https://acleddata.com/special-projects/us-crisis-monitor/
 -  “ACLED systematically collects the dates, actors, locations, fatalities, and types
of all political violence and demonstration events in the US using a
methodology consistent with our global coverage of conflict and disorder
around the world.”
 - 17675 rows, 28 columns; 3MB; 2020/05/24–2020/11/21; event breakdown:
16331 protests, 753 riots, 539 strategic developments, 42 violence against
civilians, 5 battles


### Guest Credentials
* Host cis550-proj.cl8t7peslmhx.us-east-1.rds.amazonaws.com
* Port 3306
* User guest
* Password pT2&gS3@By
* Primary Schema final_project



## Authors


Robby Ballard  P0bbn
Yolanda Shao  yoshao
Keith Svendsen ksve
Puneet Uppal p-uppal
