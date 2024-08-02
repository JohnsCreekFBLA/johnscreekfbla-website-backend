import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: Request) {
  let query = '';
  try {
    if (!request.body) {
      throw new Error("Request body is empty");
    }
    // const tempVal = await request.json();
    // return tempVal;

    const {idStudent,firstName,lastName,preferredName,emailStudent,phoneNumberStudent,gender,grade,returning,recruiter,tshirt,parentEmail,parentPhone,street,city,zipCode, ospNumber} = await request.json();

    // Implementation
    query = `INSERT INTO membership_form (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) 
    VALUES 
    ('${firstName}', '${lastName}', '${preferredName}', '${emailStudent}', '${phoneNumberStudent}', ${gender}, ${grade}, '${parentEmail}', '${parentPhone}', '${street}', '${city}', ${zipCode}, ${returning}, '${recruiter}', '${tshirt}');`;
    const response = await sql`${query}`;

    const returnString = response + query;
    return NextResponse.json({ returnString }, { status: 200 });
  } catch (error) {
    const returnString = error.message + query;
    return NextResponse.json({ returnString }, { status: 500 });
  }
}

// Debugging
// const response = await sql`INSERT INTO membership_form (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) VALUES ('John', 'Doe', 'John', 'test@gmail.com', '470-999-9999', 0, 10, 'testparent@gmail.com', '404-999-9999', '240 place street', 'Johns Creek', 30097, 0, 'Sanay', 'XL');`;


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


