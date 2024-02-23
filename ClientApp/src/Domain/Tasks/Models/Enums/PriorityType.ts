export enum PriorityType {
    Low = 1,
    Medium = 2,
    High = 3
}

export function getPriorityTypeDisplayName(type: PriorityType){
    switch(type){
        case PriorityType.Low:
            return 'Низкий'
        case PriorityType.Medium:
            return 'Средний'
        case PriorityType.High:
            return 'Высокий'
    }
}