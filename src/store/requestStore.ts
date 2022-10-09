import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MethodValue } from '../constants/Methods'

export interface RequestInstance {
    baseUrl: string
    endpoint: string
    method: MethodValue
    time: number
}

interface Endpoint {
    endpoint: string
    createdAt: number
}

interface BaseUrl {
    baseUrl: string
    endpoints: Endpoint[]
    createdAt: number
}

interface RequestStoreStates {
    baseUrl: string
    endpoint: string
    method: MethodValue
    requestResult: unknown
    baseUrlsList: BaseUrl[]
    requestsList: RequestInstance[]
}

interface RequestStoreActions {
    setMethod: (method: RequestStoreStates['method']) => void 
    setBaseUrl: (baseUrl: RequestStoreStates['baseUrl']) => void
    setEndpoint: (endpoint: RequestStoreStates['endpoint']) => void
    setRequestResult: (requestResult: RequestStoreStates['requestResult']) => void  
    addBaseUrlToList: (baseUrl: BaseUrl['baseUrl']) => void
    addRequest: (newRequest: RequestInstance) => void
    addEndpoint: (endpoint: string, baseUrlTime: number) => void
    removeRequest: (time: RequestInstance['time']) => void
}

const useRequestStore = create(
    persist<RequestStoreStates & RequestStoreActions>(
        (set, get) => ({
            method: 'GET',
            setMethod: (method) => set(() => ({ method })),

            baseUrl: 'https://pokeapi.co/api/v2/',
            setBaseUrl: (baseUrl) => set(() => ({ baseUrl })),

            endpoint: 'pokemon/ditto',
            setEndpoint: (endpoint) => set(() => ({ endpoint })),

            requestResult: null,
            setRequestResult: (requestResult) => set(() => ({ requestResult })),

            baseUrlsList: [],
            addBaseUrlToList: (baseUrl) => {
                const list = get().baseUrlsList
                const createdAt = Date.now()
                set(() => ({ baseUrlsList: [...list, { baseUrl, createdAt, endpoints: [] }] }))
            },

            addEndpoint: (endpoint, baseUrlTime) => {
                const list = get().baseUrlsList
                const createdAt = Date.now()
                const newList = list.map(Url => {
                    if (Url.createdAt === baseUrlTime) {

                        return {
                            ...Url,
                            endpoints: [...Url.endpoints, { endpoint, createdAt }]
                        }
                    }

                    return Url
                })
                set(() => ({ baseUrlsList: newList }))
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
