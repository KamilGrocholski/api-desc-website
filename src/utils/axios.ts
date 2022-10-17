import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Method } from '../store/requestsTreesStore'

interface CallConfig {
    onRequestSuccess: (config: AxiosRequestConfig) => void
    onRequestError: (error: any) => void
    onResponseSuccess: (response: AxiosResponse) => void
    onResponseError: (error: AxiosError) => void
    method: Lowercase<Method>
    headers?: Headers
    data?: AxiosRequestConfig['data'] 
    url: string
}

const axiosInstance = axios.create()

export const call = async (callConfig: CallConfig) => {

    axiosInstance.interceptors
        .request.use(
            config => handleRequestSuccess(config, callConfig.onRequestSuccess),
            error => handleRequestError(error, callConfig.onRequestError)
        )

    axiosInstance.interceptors
        .response.use(
            response => handleResponseSuccess(response, callConfig.onResponseSuccess),
            error => handleResponseError(error, callConfig.onResponseError)
        )

    await axiosInstance[callConfig.method](callConfig.url, {
        headers: callConfig.headers,
        data: callConfig?.data 
    })
}


const handleRequestSuccess = (config: AxiosRequestConfig, callback: (CallConfig['onRequestSuccess'])) => {
    callback(config)

    return Promise.resolve(config)
}

const handleRequestError = (error: AxiosRequestConfig, callback: (CallConfig['onRequestError'])) => {
    callback(error)

    return error
}

const handleResponseSuccess = (response: AxiosResponse, callback: CallConfig['onResponseSuccess']): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
    callback(response)

    return Promise.resolve(response)
}

const handleResponseError = (error: AxiosError, callback: CallConfig['onResponseError']) => {
    callback(error)

    return error 
}