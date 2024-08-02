# JCHS FBLA Website - Backend

## Installation
1. npm install -g vercel
2. vercel login
3. Link repository to Vercel via vercel.com
4. npm exec vercel deploy
5. vercel --prod

# Postgres Vercel
1. vercel link
2. vercel env pull .env.development.local 


# Local Debugging
next dev

# Setup for Postgres

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

## Attendance Form:



## Fall Rally:



