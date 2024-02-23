import { HttpClient } from "../../Common/HttpClient"
import { Page } from "../../Common/Page"
import { Result, mapToResult } from "../../Common/Result"
import { Tag, mapToTag, mapToTags } from "./Models/Tag"
import { TagBlank } from "./Models/TagBlank"

export class TagsProvider {

    public static async saveTag(data: TagBlank): Promise<Result> {
        const response = await HttpClient.post(`/tags/save`, data)
        const result = mapToResult(response)
        return result
    }

    public static async removeTag(id: string): Promise<Result> {
        const response = await HttpClient.post(`/tags/remove?id=${id}`)
        const result = mapToResult(response)
        return result
    }

    public static async getTags(data: string[]): Promise<Tag[]> {
        const response = await HttpClient.post(`/tags/get/ids`, data)
        const tags = mapToTags(response)
        return tags
    }

    public static async searchTags(searchText: string | null): Promise<Tag[]>{
        const response = await HttpClient.get(`/tags/search?searchText=${searchText}`)
        const tags = mapToTags(response)
        return tags
    }

    public static async getPage(searchText: string, pageNumber: number, countInPage: number): Promise<Page<Tag>> {
        const response = await HttpClient.get(`/tags/getPage?searchText=${searchText}&pageNumber=${pageNumber}&countInPage=${countInPage}`)
        const page = Page.get(response, mapToTag)
        return page
    }

    public static async getTag(id: string): Promise<Tag> {
        const response = await HttpClient.get(`/tags/get?id=${id}`)
        const tag = mapToTag(response)
        return tag
    }
}