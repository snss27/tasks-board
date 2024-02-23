import { Tag } from "./Tag"

export interface TagBlank {
    id: string | null,
    name: string | null,
    color: string | null
}

export namespace TagBlank {
    export function getEmpty(): TagBlank {
        return {
            id: null,
            name: null,
            color: null
        }
    }

    export function fromTag(tag: Tag): TagBlank {
        return {
            id: tag.id,
            name: tag.name,
            color: tag.color
        }
    }
}