import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import RequestBar from "../components/RequestBar";
import RequestResultWindow from "../components/RequestResultWindow";
import RequestsHistoryWindow from "../components/RequestsHistoryWindow";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Call an API</title>
        <meta name="description" content="xd" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className='flex flex-col items.center mx-auto'>
        <RequestsHistoryWindow />
        <div className='sticky top-0 flex justify-center'>
          <RequestBar />
        </div>
        <RequestResultWindow /> 
      </div>
      
    </>
  );
};

export default Home;

