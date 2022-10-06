import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Copy } from "../assets/icons";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Pokemon API</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <EndpointTestBar />
      </main>
    </>
  );
};

export default Home;


const EndpointTestBar: React.FC = () => {

  const METHODS = {
    'GET': 'GET',
    'POST': 'POST', 
    'PUT': 'PUT',
    'DELETE': 'DELETE',
    'PATCH': 'PATCH' 
  } as const

  const ENDPOINTS: Record<keyof typeof METHODS, {
    url: string
  }[]> = {
    'GET': [
      {
        url: 'get'
      }
    ],
    'POST': [
      {
        url: 'post'
      }
    ],
    'PUT': [
      {
        url: 'put'
      }
    ],
    'DELETE': [
      {
        url: 'delete'
      }
    ],
    'PATCH': [
      {
        url: 'patch'
      }
    ],
  }

  const [method, setMethod] = useState<keyof typeof METHODS>(METHODS.GET)
  const [baseURL, setBaseURL] = useState<string>('https://pokeapi.com/api/v1')
  const [endpoint, setEndpoint] = useState<string | undefined>(undefined)

  React.useEffect(() => {
    setEndpoint(ENDPOINTS[METHODS[method]][0]?.url)
    console.log('x')
  }, [method])
  

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEndpoint(e.target.value)
  }

  const handleCopyUrl = async () => {
    const url = endpoint ? baseURL + endpoint : baseURL
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(url)
    } else {
      alert('Coś z przeglądarką, bo nie ma clipboard!')
    }
  }

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setMethod(e.target.value as keyof typeof METHODS)
  }

  return (
    <div className='flex flex-row'>
      <select
        className='text-black'
        onChange={ handleMethodChange }
      >
        {Object.values(METHODS).map((method, i) => (
          <option value={ method } key={ i }>{ method }</option>
        ))}
      </select>
      <div className='bg-gray-800 text-black'><p>{ baseURL }</p></div>
      <div>
        <input 
          className='text-black' 
          type='text' 
          list='datalist-endpoints' 
          onChange={ handleEndpointChange } 
        />
        <datalist id='datalist-endpoints'>
          {method === 'GET' &&
          ENDPOINTS.GET.map((endpoint, i) => (
            <option value={ endpoint.url } key={ i }>
              { endpoint.url }
            </option>
          ))}
        </datalist>
      </div>
      <button
        onClick={ handleCopyUrl }
      >
        <Copy />
      </button>
      <div></div>
    </div>
  )
}


