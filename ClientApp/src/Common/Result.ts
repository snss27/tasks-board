class Error {
    constructor(
        public readonly message: string,
        public readonly key: string | null
    ) { }
}

export class Result {
    constructor(
        public readonly errors: Error[],
    ) { }

    public isSuccess(): boolean {
        if (this.errors.length === 0) return true
        else return false
    }

    public isFail(): boolean {
        if(this.errors.length > 0) return true
        else return false
    }

    public getFirstErrorMessage(): string | null {
        if (!this.errors[0]) return null
        return this.errors[0].message ?? null
    }

    public getFirstErrorKey(): string | null {
        if (!this.errors[0]) return null
        return this.errors[0].key ?? null
    }
}

export function mapToResult(data: any): Result {
    return new Result(data.errors)
}