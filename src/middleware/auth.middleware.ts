import { NextRequest, NextResponse } from 'next/server';

const authMiddleware = (req: NextRequest) => {
  const currentPath = req.nextUrl.pathname;

  const publicPaths = ['/auth/login', '/auth/register'];

  const staticPaths = ['/_next/static', '/styles'];

  if (
    staticPaths.some((p) => currentPath.startsWith(p)) ||
    currentPath.includes('.')
  )
    return NextResponse.next();

  const isPublicPath = publicPaths.includes(currentPath);
  const token = req.cookies.get('token');

  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  else if (isPublicPath && token)
    return NextResponse.redirect(new URL('/', req.nextUrl));

  return NextResponse.next();
};
export default authMiddleware;
