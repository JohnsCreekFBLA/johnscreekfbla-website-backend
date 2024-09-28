import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers'

// Former import statements
// import * as XLSX from 'xlsx'
// import { corsMiddleware } from './corshandler';

export async function GET(request: NextRequest) {
  try {
    // const response = new NextResponse();
    // await corsMiddleware(request, response);
    
    // Force Page to Reload: Removing this will prevent new data from being fetched
    // Note: Only necessary for GET requests, not POST requests
    const cookieStore = cookies(); 

    // Query Database and Receive Response
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
    
    // Create File Structure
    const XLSX = await import('xlsx');
    const cWorkbook = XLSX.utils.book_new();
    const cWorksheet = XLSX.utils.json_to_sheet(formattedRows);
    XLSX.utils.book_append_sheet(cWorkbook, cWorksheet, 'Students');
    const tempBuffer = XLSX.write(cWorkbook, {type: 'buffer', bookType: 'xlsx'});
    
    // Return Excel File
    const response = new NextResponse(tempBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename=students.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      }});
    return response;

    // Visible JSON Debugging
    // const response = NextResponse.json({data: formattedRows}, {status: 200});
    // return response;

  } catch (error) {
    // Visible Error Debugging
    return NextResponse.json({error: error.message}, {status: 500, headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    }});
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
