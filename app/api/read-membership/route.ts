import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx'

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT * FROM membership_form;`;
    const rows = result.rows;

    // Create excel file structure
    const cWorkbook = XLSX.utils.book_new();
    const cWorksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(cWorkbook, cWorksheet, 'Students');

    const tempBuffer = XLSX.write(cWorkbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Create a response with the buffer and appropriate headers
    const response = new NextResponse(tempBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename=students.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
    return response;
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


