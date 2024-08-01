
// await client.sql`INSERT INTO Student (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) VALUES ('John', 'Doe', 'John', 'test@gmail.com', '470-999-9999', 0, 10, 'testparent@gmail.com', '404-999-9999', '240 place street', 'Johns Creek', 30097, 0, 'Sanay', 'XL');`;

import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //   console.log("Request Received");
  //   const {idStudent,firstName,lastName,preferredName,emailStudent,phoneNumberStudent,gender,grade,returning,recruiter,tshirt,parentEmail,parentPhone,street,city,zipCode} = req.body;
  try {
    const result = await sql`SELECT * FROM students;`;
    const rows = result.rows;

    // Create a new cWorkbook and add a cWorksheet
    const cWorkbook = xlsx.utils.book_new();
    const cWorksheet = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(cWorkbook, cWorksheet, 'Students');

    const tempBuffer = xlsx.write(cWorkbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');   
    return res.status(200).send(tempBuffer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}












































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


