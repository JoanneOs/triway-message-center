# Triway Transport Message Center


Step 1: Project Setup & Basic Server

in new terminal in capstone folder:

mkdir triway-message-center
cd triway-message-center
git init
echo "# Triway Transport Message Center" > README.md
git add .
git commit -m "Initial commit: Project scaffolding"

npm init -y
npm install express mongoose dotenv cors
npm install --save-dev nodemon

created server.js

created .env 
random JWT secret (openssl rand -base64 32)

created .igonre and put .env
then pushed it to git hub:
git remote add origin https://github.com/JoanneOs/triway-message-center.git
git push -u origin main (wrong) 
had to: git push -u origin master


Step 2: Database Models
created models/User.js
models/Message

Step 3: Authentication System
middleware/auth.js
controllers/auth.js
controllers/messages.js
routes/messages.js

Step 4: Message Routes & Controllers
controllers/messages.js
routes/messages.js
routes/auth.js

Step 5: Final Server Configuration
Updated server.js to include routes:
Add to server.js after middleware setup


Testing my back-end:
npm install dotenv
npm install express
npm install mongoose
npm install cors
npm install jsonwebtoken
npm install bcryptjs


npx nodemon server.js
