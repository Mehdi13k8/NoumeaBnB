# NoumeaBnB
Application de location de gites

# launch back end
cd Noumea-Back-End
npm install
SET DEBUG=noumea-back-end:* & npm start

# launch Front End
cd Front-end/noumea-front-end
npm install
npm start

# Init fake data
cd Noumea-Back-End
node .\faker\generateData.js
