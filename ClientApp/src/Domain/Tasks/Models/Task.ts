import { PriorityType } from "./Enums/PriorityType"
import { TaskType } from "./Enums/TaskType"

export class Task {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly type: TaskType,
        public readonly priority: PriorityType,
        public readonly stepId: string,
        public readonly tagIds: string[]
    ) {

    }
}

export function mapToTask(data: any): Task {
    return new Task(data.id, data.name, data.description, data.type, data.priority, data.stepId, data.tagIds)
}

export function mapToTasks(data: any[]): Task[] {
    return data.map(data => mapToTask(data))
}