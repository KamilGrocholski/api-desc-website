import { useRouter } from "next/router"
import { MethodValue } from "../constants/Methods"
import useRequestStore from "../store/requestStore"
import { stringsCombine } from "../utils/stringsCombine"

export interface Request {
    method: MethodValue
    baseURL: string
    endpoint: string
}

type Url = Pick<Request, 'baseURL' | 'endpoint'>

const useRequest = () => {
    const { setMethod, setBaseURL, setEndpoint, method, baseURL, endpoint, setRequestResult, setRequestsList } = useRequestStore()
    const { pathname, push, basePath } = useRouter()

    const set = (request: Request) => {
        setMethod(request.method)
        setBaseURL(request.baseURL)
        setEndpoint(request.endpoint)
    }

    const send = (request: Request) => {
        set(request)

        if (pathname !== basePath) push('/')

        fetch(combinedUrl({baseURL, endpoint}), {
            method
        })
        .then(res => res.json())
        .then(data => {
            setRequestResult(data)
            setRequestsList({ 
                method, 
                baseURL, 
                endpoint, 
                time: Date.now()
            })
        })
        .catch(err => console.error(err))
    }

    const copy = (urlParts: Url) => {
        navigator.clipboard.writeText(combinedUrl({...urlParts}))
    }

    const combinedUrl = (urlParts: Url) => {
        const url = stringsCombine([urlParts.baseURL, urlParts.endpoint])

        return url
    }

    return {
        set,
        send,
        copy,
        combinedUrl
    }
}

export default useRequest