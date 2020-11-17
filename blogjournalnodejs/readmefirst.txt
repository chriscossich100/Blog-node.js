BEFORE USING THIS PROJECT: 

IN ORDER TO RUN THIS PROJECT YOU NEED TO DO 2 THINGS:

1). You first need to install node_modules which will contain all the dependencies of the 3rd party packages used. This can be done by
going into the command terminal or the integrated terminal found in your ide, and typing in 'npm install' (dont include the single quotes).


2). For sercurity reasons, the username, password, and database name have been changed when calling access to MongoDb. Simply
replace your username, password, database name, and cluster in the MongoClient.connect string found in the database.js file inside the 
util folder.