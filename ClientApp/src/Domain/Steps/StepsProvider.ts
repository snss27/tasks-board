import { HttpClient } from "../../Common/HttpClient"
import { Result, mapToResult } from "../../Common/Result"
import { Step, mapToStep, mapToSteps } from "./Models/Step"
import { StepBlank } from "./Models/StepBlank"

export class StepsProvider {

    public static async saveSteps(data: StepBlank[]): Promise<Result> {
        const response = await HttpClient.post(`/steps/save`, data)
        const result = mapToResult(response)
        return result
    }

    public static async getSteps(): Promise<Step[]> {
        const response = await HttpClient.get('/steps/get/all')
        const steps = mapToSteps(response)
        return steps
    }

    public static async getStep(stepId: string): Promise<Step> {
        const response = await HttpClient.get(`/steps/get?stepId=${stepId}`)
        const step = mapToStep(response)
        return step
    }

    public static async isStepEmpty(stepId: string): Promise<Result> {
        const response = await HttpClient.get(`/steps/isEmpty?stepId=${stepId}`)
        const result = mapToResult(response)
        return result
    }
}