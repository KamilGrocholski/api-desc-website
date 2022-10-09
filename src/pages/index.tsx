import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import RequestBar from "../components/RequestBar";
import RequestResultWindow from "../components/RequestResultWindow";
import RequestsHistoryWindow from "../components/RequestsHistoryWindow";
import RequestsTrees from "../components/RequestsTrees";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Call an API</title>
        <meta name="description" content="xd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className='flex flex-col mx-auto'>

        <div className='sticky top-0 flex justify-center'>
            <RequestBar />
        </div>

          <div className='fixed left-0'>
            <RequestsHistoryWindow />
          </div>

          <div className=''>
            <RequestResultWindow /> 
          </div>

          <div className='fixed right-0'>
            <RequestsTrees />
          </div>

      
      </div>

    </>
  );
};

export default Home;

