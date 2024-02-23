import { PriorityType } from "./Enums/PriorityType"
import { TaskType } from "./Enums/TaskType"
import { Task } from "./Task"

export interface TaskBlank {
    id: string | null,
    name: string | null,
    description: string | null,
    type: TaskType | null,
    priority: PriorityType | null,
    stepId: string | null,
    tagIds: string[]
}

export namespace TaskBlank {
    export function getEmpty(): TaskBlank {
        return {
            id: null,
            name: null,
            description: null,
            type: null,
            priority: null,
            stepId: null,
            tagIds: []
        }
    }

    export function fromTask(task: Task): TaskBlank {
        return {
            id: task.id,
            name: task.name,
            description: task.description,
            type: task.type,
            priority: task.priority,
            stepId: task.stepId,
            tagIds: task.tagIds
        }
    }
}