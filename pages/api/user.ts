import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../services/db.service'
import { routeMethodSwitch } from '../../utils/route-method-switch'
import { UsersService, UsersTable } from '../../services/users.service'
import { NextApiWithBody } from '../../utils/common.interface'

interface CreateUserRequestBody {
    username: string
    email: string
    password: string
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, username, email, role, active, created_at } = req.query

    const numberId = parseInt(id as string)

    const searchParams = {
        ...id && {id: numberId},
        ...username && {username},
        ...email && {email},
        ...role && {role},
        ...active && {active},
        ...created_at && {created_at}
    } as unknown as Partial<UsersTable>


    const userFindResponse = await UsersService.findUserNoPassword(searchParams)

    const { success, data, error } = userFindResponse

    if(!success){
        return res.json({
            success: false,
            error: 'Could not find user.'
        })
    }

    res.json({ 
        success: true,
        data
     })
}

const POST = async (req: NextApiWithBody<CreateUserRequestBody>, res: NextApiResponse) => {
    const { username, email, password } = req.body

    const userCreationResponse = await UsersService.createUser(username, email, password)

    const { success, data, error} = userCreationResponse

    if(!success){
       return res.json({
           success: false,
           error: error.message
       })
    }

    res.json({
        success: true,
        data
    })
}

const userRoutes = routeMethodSwitch({ GET, POST })

export default userRoutes
