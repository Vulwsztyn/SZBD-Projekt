# SZBD-Projekt

##Connection params:

username: **szbd**

password: **szbd**

hostname: **localhost**

port: **1521**

SID: **orcl**

Oczywiście stówrz najpierw takiego użytkownika i nadaj mu prawa.

##instalacja:

npm install --save express

npm install -g nodemon

npm install --save body-parser multer

npm install --save pug

##uruchamianie:


~~node index.js~~

`nodemon index.js`

##struktura:
```
test-project/
   node_modules/
   config/
      db.js                //Database connection and configuration
      credentials.js       //Passwords/API keys for external services used by your app
      config.js            //Other environment variables
   models/                 //For mongoose schemas
      users.js
      things.js
   routes/                 //All routes for different entities in different files 
      users.js
      things.js
   views/
      index.pug
      404.pug
        ...
   public/                 //All static content being served
      images/
      css/
      javascript/
   app.js
   routes.js               //Require all routes in this and then require this file in 
   app.js 
   package.json
```
