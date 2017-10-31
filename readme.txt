*************************************************************************************
								A D A P T I V E  W E B  A S S I G N M E N T  3
*************************************************************************************
Author: Mohseen Mukaddam <mohseen at asu dot edu>
ASUID: 1209239729
*************************************************************************************

NOTE: There might be some downtime for assignment accessible via. web,
if that is the case, mail me, and I'll look into it.
      
DESCRIPTION:

This is a react application that interfaces with ElasticSearch box
on AWS. Steps to setup local ElasticSearch, given at the end.

*************************************************************************************

USAGE:

0. Use Chrome v60+

1. Visit `http://ec2-52-15-140-218.us-east-2.compute.amazonaws.com:9040/`

*************************************************************************************

INSTALLATION:

0. Install nvm (https://github.com/creationix/nvm) 
		or nvm-windows (https://github.com/coreybutler/nvm-windows)

1. Run `nvm install 8`
		- You might need to run `source ~/.bashrc` (or whichever rc file you're using
		to reload changes)

2. Run `nvm use 8`

3. Run `npm i -g yarn`

4. Run `yarn`

*************************************************************************************

BUILD:

1. Run `yarn build` or `yarn watch`

*************************************************************************************

COMPILE:

1. Run `yarn compile`

*************************************************************************************

LINT:

1. Run `yarn lint` or `yarn lint:fix`

*************************************************************************************

OFFLINE (PARENT_DIRECTORY):

A. For offline access, run `yarn serve`

B. The client loads on localhost:9040 (You also need to run elasticsearch locally)

*************************************************************************************

OFFLINE (OFFLINE_DIRECTORY):

0. Install ElasticSearch (https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html) and all it's dependencies

1. Run `yarn` (All commands from here should be run in the offline folder)

2. Run `node build/indexWikiData.js`
		- This should populate crawled data onto local instance

*************************************************************************************
