const requestServiceFactory = (baseUrl: string = '') => {
    const get = async <T>(url: string): Promise<T> => {
        const response = await fetch(baseUrl + url)
        const json = (await response.json()) as T
        return json
    }

    const post = async <T>(url: string, body?: object): Promise<T> => {
        const response = await fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            ...(body && { body: JSON.stringify(body) })
        })
        const json = (await response.json()) as T
        return json
    }

    const requestService = { get, post }

    return requestService
}

const request = requestServiceFactory()

export { request }
