export enum TaskType {
    Task = 1,
    Bug = 2
}

export function getTaskTypeDisplayName(type: TaskType){
    switch(type){
        case TaskType.Task:
            return 'Задача'
        case TaskType.Bug:
            return 'Баг'
    }
}