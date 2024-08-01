# johnscreekfbla-website-backend

npm install -g vercel
vercel login
Link repository to Vercel
npm exec vercel deploy
vercel --prod

# Postgres Vercel
vercel link
vercel env pull .env.development.local 



next dev


CREATE TABLE IF NOT EXISTS "students" (
idStudent	int NOT NULL UNIQUE,
firstName	varchar(50),
lastName	varchar(50),
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