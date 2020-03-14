import { routeMethodSwitch } from '../../../utils/route-method-switch'
import { AuthService } from '../../../services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'


const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers?.token as string

    if(!token){
        return res.json({
            success: false, 
            error: 'No auth token available'
        })
    }

    const decodedToken = AuthService.verifyToken(token)

    const {success, data, error } = decodedToken

    if(!success){
        return res.json({
            success: false,
            error: 'Invalid auth token'
        })
    }

    res.json({
        success: true,
        data
    })
}

export default routeMethodSwitch({ POST })