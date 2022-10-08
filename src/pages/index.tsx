import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Copy } from "../assets/icons";
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
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 mt-16">
        <RequestsHistoryWindow />
        <div className='flex flex-col'>
          <RequestBar />
          <RequestResultWindow /> 
        </div>
      </main>
    </>
  );
};

export default Home;

