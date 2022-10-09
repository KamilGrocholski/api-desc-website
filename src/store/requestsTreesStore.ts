import create from 'zustand'
import { persist } from 'zustand/middleware'
import { MethodValue } from '../constants/Methods'

type BaseUrl = string

type Endpoint = string 

type Method = MethodValue

interface RequestTree {
    baseUrl: BaseUrl
    methods: Required<Record<Method, Endpoint[]>>
}

export interface MadeRequest {
    baseUrl: BaseUrl
        method: Method
        endpoint: Endpoint 
        time: number
}
interface State {
    // Current setup
    currentSetup: {
        baseUrl: BaseUrl
        method: Method
        endpoint: Endpoint
    } 

    // Request result
    requestResult: unknown

    // Made requests
    madeRequests: MadeRequest[]

    // Requests trees
    requestsTrees: RequestTree[]
}

interface Actions {
    // Current setup
    setCurrentSetup: (setup: Partial<State['currentSetup']>) => void

    // Made requests
    sendRequest: () => void

    // Requests trees
    addRequestTree: (baseUrl: BaseUrl) => void
    removeRequestTree: (baseUrl: BaseUrl) => void

    updateBaseUrl: (oldBaseUrl: BaseUrl, newBaseUrl: BaseUrl) => void
    getAllBaseUrls: () => BaseUrl[]
    getRequestTreeByBaseUrl: (baseUrl: BaseUrl) => RequestTree | undefined
    
    addEndpoint: (baseUrl: BaseUrl, method: Method, endpoint: Endpoint) => void
    updateEndpoint: (baseUrl: BaseUrl, method: Method, oldEndpoint: Endpoint, newEndpoint: Endpoint) => void
    removeEndpoint: (baseUrl: BaseUrl, method: Method, endpoint: Endpoint) => void
}


//TODO kupić spodnie w realu
export const useRequestsTreesStore = create(
    persist<State & Actions>(
        (set, get) => ({
            // Current setup
            currentSetup: {
                baseUrl: 'https://pokeapi.co/api/v2/',
                method: 'GET',
                endpoint: 'pokemon/ditto'
            },     

            setCurrentSetup: (setup) => {
                const currentSetup = get().currentSetup
                set(() => ({ currentSetup: { ...currentSetup, setup } }))
            },

            // Request result
            requestResult: undefined,

            // Made requests
            madeRequests: [],

            sendRequest: () => {
                const currentSetup = get().currentSetup
                const madeRequests = get().madeRequests
                const newRequest = {
                    ...currentSetup,
                    time: Date.now()
                }
                set(() => ({
                    madeRequests: [...madeRequests, newRequest]
                }))

                fetch(currentSetup.baseUrl+currentSetup.endpoint, {
                    method: currentSetup.method
                })
                .then(res => res.json())
                .then(data => {
                    set(() => ({ requestResult: data }))
                })
                .catch(err => console.log(err))
            },

            // Requests trees
            requestsTrees: [],

            addRequestTree: (baseUrl) => {
                const requestsTrees = get().requestsTrees
                const foundTree = requestsTrees.some(tree => tree.baseUrl === baseUrl)
                if (foundTree) return 
                set(() => ({ requestsTrees: [...requestsTrees, { baseUrl, methods: { GET: [], POST: [], PUT: [], DELETE: [] } }] }))
            },

            removeRequestTree: (baseUrl) => {
                const requestsTrees = get().requestsTrees
                set(() => ({
                    requestsTrees: requestsTrees.filter(tree => tree.baseUrl !== baseUrl)
                }))
            },

            getAllBaseUrls: () => {
                const requestsTrees = get().requestsTrees
                const baseUrls = requestsTrees.map(tree => (tree.baseUrl))

                return baseUrls
            },

            getRequestTreeByBaseUrl: (baseUrl) => {
                const requestsTrees = get().requestsTrees
                const tree = requestsTrees.find(tree => tree.baseUrl === baseUrl)

                return tree
            },

            updateBaseUrl: (oldBaseUrl, newBaseUrl) => {
                const requestsTrees = get().requestsTrees
                set(() => ({
                    requestsTrees: requestsTrees.map(tree => {
                        if (tree.baseUrl === oldBaseUrl) {

                            return {
                                ...tree,
                                baseUrl: newBaseUrl
                            }
                        }

                        return tree
                    })
                }))
            },

            addEndpoint: (baseUrl, method, endpoint) => {
                const requestsTrees = get().requestsTrees
                set(() => ({
                    requestsTrees: requestsTrees.map(tree => {
                        if (tree.baseUrl === baseUrl) {
                            const isEndpointTaken = tree.methods[method].some(val => val === endpoint)
                            if (isEndpointTaken) {

                                return tree 
                            }
                            return {
                                ...tree,
                                methods: {
                                    ...tree.methods,
                                    [method]: [...tree.methods[method], endpoint]
                                }
                            }
                        }

                        return tree
                    })
                }))
            },

            updateEndpoint: (baseUrl, method, oldEndpoint, newEndpoint) => {
                const requestsTrees = get().requestsTrees
                set(() => ({
                    requestsTrees: requestsTrees.map(tree => {
                        if (tree.baseUrl === baseUrl) {
                            const isEndpointTaken = tree.methods[method].some(en => en === newEndpoint)
                            if (isEndpointTaken) {

                                return tree
                            }
                            
                            return {
                                ...tree,
                                methods: {
                                    ...tree.methods,
                                    [method]: tree.methods[method].map(en => {
                                        if (en === oldEndpoint) {

                                            return newEndpoint
                                        }

                                        return en
                                    })
                                }
                            }
                        }

                        return tree
                    })
                }))
            },

            removeEndpoint: (baseUrl, method, endpoint) => {
                const requestsTrees = get().requestsTrees
                set(() => ({
                    requestsTrees: requestsTrees.map(tree => {
                        if (tree.baseUrl === baseUrl) {

                            return {
                                ...tree,
                                methods: {
                                    ...tree.methods,
                                    [method]: tree.methods[method].filter(en => en !== endpoint)
                                }
                            }
                        }

                        return tree
                    })
                }))
            },

        }),
        {
            name: 'RequestsTrees',
            getStorage: () => localStorage
        }
    )
)