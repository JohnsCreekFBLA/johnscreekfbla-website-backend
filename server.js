
// Serverless Method
import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import xlsx from 'xlsx';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const db = new sqlite3.Database('./information.sqlite');

// Create a sample table if it doesn't exist
db.serialize(() => {
	// db.run(`DROP TABLE IF EXISTS Student;`);
  db.run(`CREATE TABLE IF NOT EXISTS "Student" (
	"idStudent"	INTEGER NOT NULL UNIQUE,
	"firstName"	TEXT,
	"lastName"	TEXT,
	"preferredName"	TEXT,
	"email"	TEXT,
	"phoneNumber"	TEXT,
	"gender"	INTEGER,
	"grade"	INTEGER,
	"parentEmail"	TEXT,
	"parentPhone"	TEXT,
	"street"	TEXT,
	"city"	TEXT,
	"zipCode"	INTEGER,
	"returningMember"	INTEGER,
	"recruiter"	TEXT,
	"tshirt"	TEXT,
	PRIMARY KEY("idStudent" AUTOINCREMENT)
  ); 
    `);
  db.run(`INSERT INTO Student (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) VALUES ('John', 'Doe', 'John', 'test@gmail.com', '470-999-9999', 0, 10, 'testparent@gmail.com', '404-999-9999', '240 place street', 'Johns Creek', 30097, 0, 'Sanay', 'XL');`);
});

// Download Excel File
app.post('/updateMembership', (req, res) => {
  console.log("Request Received");
  const {idStudent,firstName,lastName,preferredName,emailStudent,phoneNumberStudent,gender,grade,returning,recruiter,tshirt,parentEmail,parentPhone,street,city,zipCode} = req.body;

  // Fix missing fields later

	db.run(`INSERT INTO Student (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) VALUES ('${firstName}', '${lastName}', '${preferredName}', '${emailStudent}', ${phoneNumberStudent}, ${gender}, ${grade}, '${parentEmail}', '${parentPhone}', '${street}', '${city}', ${zipCode}, '${returning}', '${recruiter}', '${tshirt}');`, function(err) {
    if (err) {
      res.status(500).json({error: "Insertion Failure: " + err.message});
      return;
    }
    res.status(200).json({message: 'Student Inserted'});
  });
});


// Endpoint to convert SQLite data to XLSX and download
app.get('/downloadExcel', (req, res) => {
  console.log("Download Request Received");
  const query = "SELECT * FROM Student";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Create a new workbook and add a worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');
    const filePath = 'C:/Users/MD3728/Downloads/students.xlsx';//Change
    xlsx.writeFile(workbook, filePath);
    res.download(filePath, 'students.xlsx', (err) => {
      fs.unlinkSync(filePath); // Delete temporary file
    });
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});


module.exports = app; // For Vercel Deployment


// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();
// const app = express();
// const port = 3000;

// // Connect to SQLite database file
// const db = new sqlite3.Database('./database.sqlite');

// // Create a sample table if it doesn't exist
// db.serialize(() => {
//   db.run("CREATE TABLE IF NOT EXISTS user (id INT, name TEXT)");
//   db.run("INSERT INTO user (id, name) VALUES (1, 'John Doe')");
// });

// Identification: 13 Fields
//     - First Name
//     - Last Name
//     - Preferred Name
//     - Email
//     - Phone Number
//     - Gender
//     - Grade
//     - Parent Email
//     - Parent Phone
//     - Street
//     - City
//     - Zip Code

// Misc: 3 Fields
//     - Returning Member? 
//     - Recruiter
//     - T-Shirt Size


// For Vercel Deployment
// module.exports = (req, res) => {
//   // Endpoint to get data from the database
//   db.all("SELECT * FROM Student", [], (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.status(200).json(rows);
//   });
// };


