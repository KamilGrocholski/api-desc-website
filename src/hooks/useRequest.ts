import { useRouter } from "next/router"
import { MethodValue } from "../constants/Methods"
import useRequestStore from "../store/requestStore"
import { stringsCombine } from "../utils/stringsCombine"
import { toast } from 'react-toastify'
import { TOAST_CONTAINERS_IDS } from "../constants/ToastContainers"

export interface Request {
    method: MethodValue
    baseUrl: string
    endpoint: string
}

type Url = Pick<Request, 'baseUrl' | 'endpoint'>

const useRequest = () => {
    const { setMethod, setBaseUrl, setEndpoint, method, baseUrl, endpoint, setRequestResult, addRequest, removeRequest } = useRequestStore()
    const { pathname, push, basePath } = useRouter()

    const set = (request: Request) => {
        setMethod(request.method)
        setBaseUrl(request.baseUrl)
        setEndpoint(request.endpoint)
    }

    const send = (request: Request) => {
        set(request)

        if (pathname !== basePath) push('/')

        fetch(combinedUrl({baseUrl, endpoint}), {
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
                baseUrl, 
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

    const copy = (UrlParts: Url) => {
        try {
            navigator.clipboard.writeText(combinedUrl({...UrlParts}))
            toast('Copied!', {
                type: 'success',
                containerId: TOAST_CONTAINERS_IDS['HISTORY_REQUEST_ACTION_NOTIFICATIONS']
            })
        } catch (err) {
            console.log(err)
        }
    }

    const combinedUrl = (UrlParts: Url) => {
        const Url = stringsCombine([UrlParts.baseUrl, UrlParts.endpoint])

        return Url
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