export const stringsCombine = (strs: (string | number)[], separator?: string): string => {
    const result = strs.join(separator ?? '')

    return result
}