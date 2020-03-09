import { Pool } from 'pg'
import { config } from '../app.config'

const connectionString = config.pg.connectionString

let db: Pool

const init = () => {
    console.log(config.pg, 'afweiojpawefjoifaewjopiawfepjoafwepojiafwejoo')
    if (!db) {
        db = new Pool({ connectionString: 'postgres://user:pass@postgres:5432/db' })
    }
}

const tryCatchP = <T>(func: T) =>
    (((...params: any) => {
        try {
            //@ts-ignore
            return func(...params)
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }) as unknown) as T

const time = tryCatchP(
    async (): Promise<{ success: boolean; data?: any; error?: any }> => {
        init()
        const response = await db.query<{now: string}>('SELECT NOW()')
        return {
            success: true,
            data: response.rows[0]
        }
    }
)

export { db, time }
