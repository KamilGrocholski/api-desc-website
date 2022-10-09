import { NextPage } from "next";
import Head from "next/head";
import { useRequestsTreesStore } from "../store/requestsTreesStore";

const YourRequests: NextPage = () => {
    const { addRequestTree, addEndpoint } = useRequestsTreesStore()



    return (
        <>
            <Head>

            </Head>
            <main>
                <div>

                </div>
            </main>
        </>
    )
}

export default YourRequests