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

export { tryCatchP }
