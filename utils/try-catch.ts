const tryCatch = <T>(func: T) =>
    (( (...params: any) => {
        try {
            //@ts-ignore
            const result = func(...params)
            return result
        } catch (error) {
            console.log({error})
            return {
                success: false,
                error
            }
        }
    }) as unknown) as T


const tryCatchP = <T>(func: T) =>
    ((async (...params: any) => {
        try {
            //@ts-ignore
            const result = await func(...params)
            return result
        } catch (error) {
            console.log({error})
            return {
                success: false,
                error
            }
        }
    }) as unknown) as T

export { tryCatch, tryCatchP }
