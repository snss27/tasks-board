export class Step {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isLast: boolean,
        public readonly position: number
    ) {

    }
}

export function mapToStep(data: any): Step {
    return new Step(data.id, data.name, data.isLast, data.position)
}

export function mapToSteps(data: any[]): Step[] {
    return data.map(data => mapToStep(data))
}