import { HttpClient } from "../../Common/HttpClient"
import { Result, mapToResult } from "../../Common/Result"
import { Task, mapToTask, mapToTasks } from "./Models/Task"
import { TaskBlank } from "./Models/TaskBlank"

export class TasksProvider {

    public static async saveTask(data: TaskBlank): Promise<Result> {
        const response = await HttpClient.post(`/tasks/save`, data)
        const result = mapToResult(response)
        return result
    }

    public static async getTasksByStepIds(searchText: string | null = null, exiistingStepIds: string[]): Promise<Task[]> {
        const response = await HttpClient.post(`/tasks/get/list?searchText=${searchText ?? ''}`, exiistingStepIds)
        const tasks = mapToTasks(response)
        return tasks
    }

    public static async moveTask(taskId: string, stepId: string){
        const response = await HttpClient.post(`/tasks/move?taskId=${taskId}&stepid=${stepId}`)
        const result = mapToResult(response)
        return result
    }

    public static async RemoveTask(taskId: string){
        const response = await HttpClient.post(`/tasks/remove?taskId=${taskId}`)
        const result = mapToResult(response)
        return result
    }

    public static async getTask(id: string): Promise<Task> {
        const response = await HttpClient.get(`/tasks/get?id=${id}`)
        const task = mapToTask(response)
        return task
    }

}