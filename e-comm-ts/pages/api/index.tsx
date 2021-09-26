import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.redirect('/');
  } else {
    const query = req.query;

    res.json({ lo: query });
  }
};

export default handler;
