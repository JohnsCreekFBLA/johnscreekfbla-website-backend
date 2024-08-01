import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  try {
    // const {idStudent,firstName,lastName,preferredName,emailStudent,phoneNumberStudent,gender,grade,returning,recruiter,tshirt,parentEmail,parentPhone,street,city,zipCode} = await request.json();

    // Debugging
    const response = await sql`INSERT INTO membership_form (firstName, lastName, preferredName, email, phoneNumber, gender, grade, parentEmail, parentPhone, street, city, zipCode, returningMember, recruiter, tshirt) VALUES ('John', 'Doe', 'John', 'test@gmail.com', '470-999-9999', 0, 10, 'testparent@gmail.com', '404-999-9999', '240 place street', 'Johns Creek', 30097, 0, 'Sanay', 'XL');`;

    // Implementation
    // const response = await sql`
    // UPDATE membership_form SET 
    //   firstName = ${firstName},
    //   lastName = ${lastName},
    //   preferredName = ${preferredName},
    //   email = ${emailStudent},
    //   phoneNumber = ${phoneNumberStudent},
    //   gender = ${gender},
    //   grade = ${grade},
    //   parentEmail = ${parentEmail},
    //   parentPhone = ${parentPhone},
    //   street = ${street},
    //   city = ${city},
    //   zipCode = ${zipCode},
    //   returningMember = ${returning},
    //   recruiter = ${recruiter},
    //   tshirt = ${tshirt}
    // WHERE idStudent = ${idStudent};`;

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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


