import { query, db } from "./db.service"
import { tryCatchP } from "../utils/try-catch"
import { SuccessWrapper } from "../utils/common.interface"

const CrudServiceFactory = <T>(table: string) => {
    const create = tryCatchP(async (crudMap: T ): Promise<SuccessWrapper<T>> => {
        const columnString = Object.keys(crudMap).join(', ')
        const crudMapValues = Object.values(crudMap)
        const valuesString = crudMapValues.map((value: any, i: number ) => '$' + (i + 1)).join(', ')
        const queryString = `
        INSERT INTO ${table} ( ${columnString} ) VALUES ( ${valuesString} ) RETURNING *
        `
        console.info({queryString, crudMapValues})
        const response = await query.one<T>(queryString, crudMapValues)
        console.info(response)

        if(!response.success){
            return {
                success: false,
                error: response.error
            }
        }

        return {
            success: true,
            data: response.data
        }
    })


    const userService =  {
        create
    }

    return userService
}


export {
   CrudServiceFactory 
}