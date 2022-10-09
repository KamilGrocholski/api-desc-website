import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MethodValue } from '../constants/Methods'

export interface RequestInstance {
    baseURL: string
    endpoint: string
    method: MethodValue
    time: number
}

interface Endpoint {
    endpoint: string
    createdAt: number
}

interface BaseUrl {
    baseURL: string
    endpoints: Endpoint[]
    createdAt: number
}

interface RequestStoreStates {
    baseURL: string
    endpoint: string
    method: MethodValue
    requestResult: unknown
    baseURLsList: BaseUrl[]
    requestsList: RequestInstance[]
}

interface RequestStoreActions {
    setMethod: (method: RequestStoreStates['method']) => void 
    setBaseURL: (baseURL: RequestStoreStates['baseURL']) => void
    setEndpoint: (endpoint: RequestStoreStates['endpoint']) => void
    setRequestResult: (requestResult: RequestStoreStates['requestResult']) => void  
    addBaseURLToList: (baseURL: BaseUrl['baseURL']) => void
    addRequest: (newRequest: RequestInstance) => void
    addEndpoint: (endpoint: string, baseURLTime: number) => void
    removeRequest: (time: RequestInstance['time']) => void
}

const useRequestStore = create(
    persist<RequestStoreStates & RequestStoreActions>(
        (set, get) => ({
            method: 'GET',
            setMethod: (method) => set(() => ({ method })),

            baseURL: 'https://pokeapi.co/api/v2/',
            setBaseURL: (baseURL) => set(() => ({ baseURL })),

            endpoint: 'pokemon/ditto',
            setEndpoint: (endpoint) => set(() => ({ endpoint })),

            requestResult: null,
            setRequestResult: (requestResult) => set(() => ({ requestResult })),

            baseURLsList: [],
            addBaseURLToList: (baseURL) => {
                const list = get().baseURLsList
                const createdAt = Date.now()
                set(() => ({ baseURLsList: [...list, { baseURL, createdAt, endpoints: [] }] }))
            },

            addEndpoint: (endpoint, baseURLTime) => {
                const list = get().baseURLsList
                const createdAt = Date.now()
                const newList = list.map(url => {
                    if (url.createdAt === baseURLTime) {

                        return {
                            ...url,
                            endpoints: [...url.endpoints, { endpoint, createdAt }]
                        }
                    }

                    return url
                })
                set(() => ({ baseURLsList: newList }))
            },

            requestsList: [],
            addRequest: (newRequest) => {
                const list = get().requestsList
                set(() => ({ requestsList: [newRequest, ...list] }))
            },
            removeRequest: (time) => {
                const list = get().requestsList
                set(() => ({ requestsList: list.filter(request => request.time !== time) }))
            }
        }),
        { 
            name: 'RequestsStorage',
            getStorage: () => localStorage
        }
    )
)


export default useRequestStore
