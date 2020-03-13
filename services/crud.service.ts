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

    const find = async (crudParamMap: Partial<T>, joinString: 'AND' | 'OR' = 'AND'): Promise<SuccessWrapper<T[]>> => {
        const columnKeys = Object.keys(crudParamMap)
        const columnValues = Object.values(crudParamMap) as (string | number)[]
        const searchParameters = columnKeys
            .map((columnName: any, i: number ) => `${columnName} = $${(i + 1)} `)
            .join(joinString + ' ')
        const queryString = `
        SELECT * FROM ${table} WHERE ${searchParameters}
        `
        console.info({queryString, columnValues})
        const response = await query.any<T>(queryString, columnValues)

        const { data } = response

        if(!data[0]){
            return {
                success: false,
                error: new Error('No rows found')
            }
        }

        return {
            success: true,
            data
        }

    }

    const findOne = tryCatchP(async (crudParamMap: Partial<T>): Promise<SuccessWrapper<T>> => {
        const response = await userService.find(crudParamMap)
        
        const {data, success} = response

        if(!success){
            return {
                success: false,
                error: response.error
            }
        }

        if(data[1]){
            return {
                success: false,
                error: new Error('Found more than one row')
            }
        }

        return {
            success: true,
            data: data[0]
        }
    })


    const userService =  {
        create,
        find,
        findOne
    }

    return userService
}


export {
   CrudServiceFactory 
}