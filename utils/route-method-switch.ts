import { NextApiRequest, NextApiResponse } from 'next'

export type NextRouteMethod = ((req: NextApiRequest, res: NextApiResponse) => void) | ((req: NextApiRequest, res: NextApiResponse) => Promise<void>)

export interface RouteMethodSwitch {
    GET?: NextRouteMethod
    POST?: NextRouteMethod
    DELETE?: NextRouteMethod
    UPDATE?: NextRouteMethod
}

const noRouteImplemented = (req: NextApiRequest, res: NextApiResponse) =>
    res.json({
        success: false,
        error: 'Route not implemented'
    })

const blankSwitch: RouteMethodSwitch = {
    GET: noRouteImplemented,
    POST: noRouteImplemented,
    DELETE: noRouteImplemented,
    UPDATE: noRouteImplemented
}

const routeMethodSwitch = (routes: RouteMethodSwitch) => {
    const filledRoutes = {
        ...blankSwitch,
        ...routes
    }
    return (req: NextApiRequest, res: NextApiResponse) => {
        if (!['GET', 'POST', 'DELETE', 'UPDATE'].includes(req.method)) {
            return res.json({
                success: false,
                error: `Route method ${req.method} not supported`
            })
        }

        const method = (req.method as unknown) as keyof RouteMethodSwitch

        filledRoutes[method](req, res)
    }
}

export {
    routeMethodSwitch
}