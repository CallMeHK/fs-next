import { NextApiRequest, NextApiResponse } from 'next'


export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
					res.send('post')
  } else {
					res.send('not post')
  }
}
