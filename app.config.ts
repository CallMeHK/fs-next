const config = {
    pg: {
        connectionString: process.env.PGCONNECTION
    },
    auth: {
        secret: process.env.JWTSECRET
    }
}

export { config }
