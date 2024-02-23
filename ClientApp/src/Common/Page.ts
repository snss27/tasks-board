
export class Page<T>{
    constructor(
        public readonly values: T[],
        public readonly totalRows: number
    ) { }

    public static get<T>(data: any, converter: (value: any) => T) {
        const values = (data.values as any[]).map(value => converter(value))
        return new Page(values, data.totalRows)
    }
}