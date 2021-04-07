// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handleSignIn = (req: NextApiRequest, res: NextApiResponse) => {
  const { userName, password } = req.body;

  if (userName === 'bruno sartori' && password === 'bukassas9') {
    res.statusCode = 200;
    res.json({ data: { type: 'success', token: 'b9f86bd8a29e76c'}, meta: {} });
  } else {
    res.statusCode = 401;
    res.json({ data: 'login or password incorrect', meta: {}});
  }
};

const handleGetLoginInfo = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization === 'JWT b9f86bd8a29e76c') {
    res.statusCode = 200;
    res.json({ data: { userName: 'bruno sartori' }, meta: {} });
  } else {
    res.status(401).json({ data: 'token incorrect' });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      handleSignIn(req, res);
      break;
    case 'GET':
      handleGetLoginInfo(req, res);
      break;
    default:
      res.statusCode = 404;
      res.json({ data: 'not found', meta: {} });
  }
}
