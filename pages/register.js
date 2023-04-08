/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';
import nookies from 'nookies'
// import styles from '@/styles/regis.css'


export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx)
  console.log(cookies)

  if(cookies.token){
    return{
      redirect:{
        destination : '/dashboard'
    }
    }
  }
  return{
    props: {}
  }
}



export default function register() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [progress, setProgress]= useState(false);

  const doregister = async (e) => {
    e.preventDefault(); // prevent form from submitting normally

    setProgress(true);
    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, password })
    });
    
    const data = await res.json();
    console.log(data);

    if(data.token){
      setEmail();
      setName();
      setPassword();
      setSuccess(true);
      e.target.reset();
      Router.push('/');
    }

    setProgress(false);

  };

  return (      
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 class="font-bold text-center text-2xl mb-5">Register</h1>  
      {success &&(
      <div className='bg-green-500 text-white rounded-mb-7 px-5 py-4 '>
            Selamat! Registrasi anda berhasil!
        </div>
      )}
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <form onSubmit={doregister} class="px-5 py-7">
        <label class="font-semibold text-sm text-gray-600 pb-1 block">name</label>
          <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="name" id='name' value={name} onChange={(e) => setName(e.target.value)} />
          <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
          <input type="email" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
          <input type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Register</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </button>
        </form>
      </div>
      <div class="py-5">
          <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap">
              <Link href="/">
              <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span class="inline-block ml-1">Back to your-app.com</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  </div>
    )
}

