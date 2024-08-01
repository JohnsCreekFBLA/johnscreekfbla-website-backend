import { NextRequest, NextResponse } from 'next/server';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*' // Everything, restrict later
});

function runMiddleware(req: NextRequest, res: NextResponse, corsParse: Function) {
  return new Promise((resolve, reject) => {
    corsParse(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function corsMiddleware(req: NextRequest, res: NextResponse) {
  await runMiddleware(req, res, cors);
}