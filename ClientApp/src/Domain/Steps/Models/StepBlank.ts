import { Step } from "./Step"

export interface StepBlank {
    id: string | null,
    name: string | null,
    isLast: boolean | null,
    position: number | null
}

export namespace StepBlank {
    export function getEmpty(): StepBlank {
        return {
            id: null,
            name: null,
            isLast: false,
            position: null
        }
    }

    export function fromStep(step: Step): StepBlank {
        return {
            id: step.id,
            name: step.name,
            isLast: step.isLast,
            position: step.position
        }
    }
}