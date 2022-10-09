import { useRequestsTreesStore } from "../store/requestsTreesStore"

export const useCurrentRequestTree = () => {
    const {
        getAllBaseUrls,
        getRequestTreeByBaseUrl
    } = useRequestsTreesStore()



    return {
       
    }
}