import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const jwt = req.cookies.get('myTokenName');

  if (!jwt) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  try {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode('secret'))
    console.log(payload);
    return NextResponse.next();
  }
  catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard', '/']
}