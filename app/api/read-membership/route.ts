import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import * as XLSX from 'xlsx'
import { corsMiddleware } from '../corshandler';

export async function POST(request: NextRequest) {
  try {
    const response = new NextResponse();
    await corsMiddleware(request, response);

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
    
    // Headers
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Disposition', 'attachment; filename=students.xlsx');
    responseHeaders.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return new NextResponse(tempBuffer, { headers: responseHeaders });
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500});
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


