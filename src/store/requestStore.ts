import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MethodValue } from '../constants/Methods'

interface RequestInstance {
    baseURL: string
    endpoint: string
    method: MethodValue
    time: number
}

interface RequestStoreStates {
    baseURL: string
    endpoint: string
    method: MethodValue
    requestResult: unknown
    requestsList: RequestInstance[]
}

interface RequestStoreActions {
    setMethod: (method: RequestStoreStates['method']) => void 
    setBaseURL: (baseURL: RequestStoreStates['baseURL']) => void
    setEndpoint: (endpoint: RequestStoreStates['endpoint']) => void
    setRequestResult: (requestResult: RequestStoreStates['requestResult']) => void  
    setRequestsList: (newRequest: RequestInstance) => void
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

            requestsList: [],
            setRequestsList: (newRequest) => {
                const list = get().requestsList
                set(() => ({ requestsList: [...list, newRequest] }))
            }
        }),
        { 
            name: 'RequestsStorage',
            getStorage: () => localStorage
        }
    )
)


export default useRequestStore
