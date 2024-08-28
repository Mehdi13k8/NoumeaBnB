# NoumeaBnB
Application de location de gites

# launch back end
cd Noumea-Back-End
node app.js

# launch Front End
cd Front-end/noumea-front-end
yarn install
yarn dev

# Init fake data
cd Noumea-Back-End
node .\faker\generateData.js

# Login with fake data
    - email: "admin@example.com",
    - password: "securepassword"