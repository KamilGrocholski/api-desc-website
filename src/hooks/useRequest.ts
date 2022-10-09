import { useRouter } from "next/router"
import { MethodValue } from "../constants/Methods"
import useRequestStore from "../store/requestStore"
import { stringsCombine } from "../utils/stringsCombine"
import { toast } from 'react-toastify'
import { TOAST_CONTAINERS_IDS } from "../constants/ToastContainers"

export interface Request {
    method: MethodValue
    baseURL: string
    endpoint: string
}

type Url = Pick<Request, 'baseURL' | 'endpoint'>

const useRequest = () => {
    const { setMethod, setBaseURL, setEndpoint, method, baseURL, endpoint, setRequestResult, addRequest, removeRequest } = useRequestStore()
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
        .then(res => {
            toast.dismiss()
            return res.json()
        })
        .then(data => {
            setRequestResult(data)
            addRequest({ 
                method, 
                baseURL, 
                endpoint, 
                time: Date.now()
            })
            toast('The request has been sent!', {
                theme: 'dark',
                type: 'success',
                className: 'w-12 h-10',
                containerId: TOAST_CONTAINERS_IDS['REQUEST_NOTIFICATIONS']
            })
        })
        .catch(err => console.error(err))
    }

    const copy = (urlParts: Url) => {
        try {
            navigator.clipboard.writeText(combinedUrl({...urlParts}))
            toast('Copied!', {
                type: 'success',
                containerId: TOAST_CONTAINERS_IDS['HISTORY_REQUEST_ACTION_NOTIFICATIONS']
            })
        } catch (err) {
            console.log(err)
        }
    }

    const combinedUrl = (urlParts: Url) => {
        const url = stringsCombine([urlParts.baseURL, urlParts.endpoint])

        return url
    }

    const remove = (time: number) => {
        try {
            removeRequest(time)
        } catch (err) {
            console.log(err)
        }
    }

    return {
        set,
        send,
        copy,
        combinedUrl,
        remove
    }
}

export default useRequest