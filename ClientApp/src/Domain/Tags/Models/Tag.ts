export class Tag {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color: string
  ) {

  }
}

export function mapToTag(data: any): Tag {
  return new Tag(data.id, data.name, data.color)
}

export function mapToTags(data: any[]): Tag[] {
  return data.map(data => mapToTag(data))
}