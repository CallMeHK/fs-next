export interface SuccessWrapper<T> {
    success: boolean
    data?: T
    error?: Error
}

