import { checkErrorKey } from "./CheckErrorKey"
import { Result } from "./Result"

export function getHelperText(textFieldKey: string, result: Result | null) {
    if (checkErrorKey(textFieldKey, result)) return result?.getFirstErrorMessage()
    return null
  }