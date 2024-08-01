import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx'

export async function POST(request: Request) {
  try {
    // Parse data
    const result = await sql`SELECT * FROM membership_form;`;
    const fields = result.fields;
    const rows = result.rows;
    const formattedRows = rows.map((row: any) => {// Map into JSON
      const formattedRow: any = {};
      fields.forEach((field: any) => {
        formattedRow[field.name] = row[field.name];
      });
      return formattedRow;
    });

    // Create excel file structure
    const cWorkbook = XLSX.utils.book_new();
    const cWorksheet = XLSX.utils.json_to_sheet(formattedRows);
    XLSX.utils.book_append_sheet(cWorkbook, cWorksheet, 'Students');
    const tempBuffer = XLSX.write(cWorkbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Response with headers
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


