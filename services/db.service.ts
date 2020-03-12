import { Pool } from 'pg'
import { config } from '../app.config'
import { tryCatchP } from '../utils/try-catch'
import { SuccessWrapper } from '../utils/common.interface'

const connectionString = config.pg.connectionString

let db: Pool

const init = () => {
    if (!db) {
        db = new Pool({ connectionString })
    }
}

const time = tryCatchP(
    async (): Promise<SuccessWrapper<{now: string}>> => {
        init()
        const response = await db.query<{ now: string }>('SELECT NOW()')
        return {
            success: true,
            data: response.rows[0]
        }
    }
)

const one = tryCatchP(
    async <T>(queryString: string, params?: (string | number)[]): Promise<SuccessWrapper<T>> => {
        init()
        const response = params ? await db.query<T>(queryString, params) : await db.query<T>(queryString)
        const { rows } = response

        if (rows[1]) {
            return {
                success: false,
                error: new Error('More than one row returned')
            }
        }

        if (!rows[0]) {
            return {
                success: false,
                error: new Error('No rows found')
            }
        }

        return {
            success: true,
            data: rows[0]
        }
    }
)

const any = tryCatchP(
    async <T>(queryString: string, params?: (string | number)[]): Promise<SuccessWrapper<T[]>> => {
        init()
        const response = params ? await db.query<T>(queryString, params) : await db.query<T>(queryString)
        const { rows } = response

        return {
            success: true,
            data: rows
        }
    }
)



const query = {
    time,
    one,
    any
}

export { db, query}
