import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../services/db.service'
import { UsersService } from '../../../services/users.service'
import { PasswordService } from '../../../services/password.service'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await query.time()
    console.log(response)
    const randomInt = Math.floor(Math.random()*10000000)
    const userResponse = await UsersService.createUser(
        'Ty' + randomInt,
        randomInt + '@ty.com',
        'pw'
    )

    console.log({userResponse})

    res.json(userResponse)
}
