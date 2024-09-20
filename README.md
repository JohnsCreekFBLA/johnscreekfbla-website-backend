# JCHS FBLA Website - Backend

## Description
This is the backend for the JCHS FBLA website build on next.js. The backend is hosted on Vercel and uses a Postgres database from Vercel. Used to handle form submission data and uploads to onedrive

# Setup
1. npm init
2. See below:

## Dependencies
<ul>

Dependencies:
<li>"@vercel/postgres": "^0.9.0",</li>
<li>"cors": "^2.8.5",</li>
<li>"express": "^4.19.2",</li>
<li>"micro-cors": "^0.1.1",</li>
<li>"next": "^14.2.5",</li>
<li>"sqlite3": "^5.1.7",</li>
<li>"xlsx": "^0.18.5"</li>
<li>"eslint": "^8",</li>
<li>"eslint-config-next": "14.2.8"</li>

Dev Dependencies:
<li>"@types/react": "18.3.3",</li>
<li>"typescript": "5.5.4"</li>
</ul>

3. npm link @vercel/postgres cors express micro-cors next sqlite3 xlsx @types/react typescript eslint eslint-config-next
4. next dev

# Vercel Setup
1. npm install -g vercel
2. vercel login
3. Link repository to Vercel via vercel.com
4. npm exec vercel deploy
5. vercel --prod

# Postgres Setup
## Postgres Vercel Integration
1. vercel link
2. vercel env pull .env.development.local 

## Membership Form: 
CREATE TABLE IF NOT EXISTS "membership_form" (
idStudent	SERIAL,
firstName	varchar(50),
lastName varchar(50),
preferredName	varchar(50),
email	varchar(50),
phoneNumber	varchar(50),
gender int,
grade	int,
parentEmail	varchar(50),
parentPhone	varchar(50),
street	varchar(50),
city	varchar(50),
zipCode	int,
returningMember	int,
recruiter	varchar(50),
tshirt	varchar(50),
PRIMARY KEY(idStudent)
);



