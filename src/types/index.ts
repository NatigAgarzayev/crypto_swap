export interface ConfigKey {
    status: string
    message: string
    data: {
        configurationKey: {
            id: number,
            name: string,
            key: string
        }
    }
}