import { NextRequest } from 'next/server';
import authMiddleware from './middleware/auth.middleware';

const middleware = (request: NextRequest) => {
  return authMiddleware(request);
};

export default middleware;
