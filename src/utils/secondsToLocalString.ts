export const secondsToLocalString = (seconds: number): string => {
    const result = new Date(seconds).toLocaleString('pl-PL') 

    return result
}