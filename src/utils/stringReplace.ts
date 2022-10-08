export const httpsReplace = (str: string): string => {
    return str.replace(/(^\w+:|^)\/\//, '')
}