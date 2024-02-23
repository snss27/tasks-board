export class HttpClient {
    public static async get(url: string, host: string = "https://localhost:7144"): Promise<any> {
        const fullUrl = `${host}${url}`
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    }

    public static async post(url: string, data: any = null, host: string = "https://localhost:7144"): Promise<any> {
        const fullUrl = `${host}${url}`

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        return response.json()
    }
}