# JCHS FBLA Experimental Form - Backend

## Description
Backend for JCHS FBLA website communicating with Vercel Postgres DB. Experimental: Implement at your own risk.

# Setup
1. npm init
2. Install dependencies (see below)
3. Setup Postgres DB (see below)
4. next dev (defaults to localhost:3000)

# Dependencies
<ul>
Dependencies:
<li>"@vercel/postgres": "^0.9.0"</li>
<li>"cors": "^2.8.5"</li>
<li>"express": "^4.19.2"</li>
<li>"micro-cors": "^0.1.1"</li>
<li>"next": "^14.2.5"</li>
<li>"xlsx": "^0.18.5</li>
<li>"eslint": "^8"</li>
<li>"eslint-config-next": "14.2.8"</li>
<br/>
Dev Dependencies:
<li>"@types/node": "22.5.5"</li>
<li>"@types/react": "18.3.3"</li>
<li>"typescript": "5.5.4"</li>

</ul>

## Global Installation
1. npm install @vercel/postgres cors express micro-cors next xlsx @types/react typescript eslint eslint-config-next -g
2. npm link @vercel/postgres cors express micro-cors next xlsx @types/react typescript eslint eslint-config-next

## Local Installation
1. npm install @vercel/postgres cors express micro-cors next xlsx @types/react typescript eslint eslint-config-next

# Postgres Setup
## Vercel CLI
1. npm install -g vercel
2. vercel login
3. Link repository to Vercel via vercel.com UI
4. npm exec vercel deploy
5. vercel --prod (For command line deployment to production w/o git commit)

## Postgres Vercel Integration
1. vercel link
2. vercel env pull .env.development.local 

## Example Membership Form Table
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

# Testing
1. Go to localhost:3000/api/read-membership to see if it downloads an .xlsx file
2. Go to localhost:3000/api/write-membership to see if it writes to the database, check on vercel postgres dashboard

# Debugging
1. If 404 page fails to compile, then make sure the next.js version is updated to latest
