import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../services/db.service'
import { routeMethodSwitch } from '../../utils/route-method-switch'

const GET = (req: NextApiRequest, res: NextApiResponse) => res.json({msg: 'GET USER'})

const userRoutes = routeMethodSwitch({ GET })

export default userRoutes