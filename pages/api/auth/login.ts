import { routeMethodSwitch } from '../../../utils/route-method-switch'
import { NextApiWithBody } from '../../../utils/common.interface'
import { UsersService } from '../../../services/users.service'
import { PasswordService } from '../../../services/password.service'
import { AuthService } from '../../../services/auth.service'
import { NextApiResponse } from 'next'

interface LoginRequestBody {
    email: string
    password: string
}

const POST = async (req: NextApiWithBody<LoginRequestBody>, res: NextApiResponse) => {
    const { email: requestEmail, password: requestPassword } = req.body

    const user = await UsersService.findOne({ email: requestEmail })

    if (!user.success) {
        return res.json({ success: false, error: 'Could not find user.' })
    }

    const { email: dbEmail, password: dbPassword } = user.data

    const isPasswordValid = await PasswordService.compare(requestPassword, dbPassword)

    if (!isPasswordValid.success) {
        return res.json({ success: false, error: 'Invalid credentials.' })
    }

    const { id, username, email, role } = user.data

    const createToken = AuthService.signToken({
        id,
        username,
        email,
        role
    })

    if (!createToken.success) {
        return res.json({ success: false, error: 'Something went wrong. Please try again later.' })
    }

    const { token } = createToken.data

    return res.json({
        success: true,
        data: {
            token
        }
    })
}

const loginRoutes = routeMethodSwitch({ POST })

export default loginRoutes
