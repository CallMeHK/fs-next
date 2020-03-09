import { NextApiRequest, NextApiResponse } from 'next'
import {time} from '../../services/db.service'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
          const response = await time()
          console.log(response)
					res.json(response)
  } else {
					res.send('not post')
  }
}
