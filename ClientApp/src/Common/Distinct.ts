export { }

declare global {
    interface Array<T> {
        distinct(): T[]
    }
}


Array.prototype.distinct = function <T>(): T[] {
    return this.filter((value, index, self) => self.indexOf(value) === index)
}