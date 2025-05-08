# Triway Transport Message Center

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

