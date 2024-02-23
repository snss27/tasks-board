import { Result } from "./Result";

export function checkErrorKey(errorKey: string, result: Result | null) {
    if (
      result !== null &&
      !result.isSuccess() &&
      result.getFirstErrorKey() === errorKey
    )
      return true;
    return false;
  }