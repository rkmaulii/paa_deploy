/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
// import styles from '@/styles/regis.css'
import Link from 'next/link';
import nookies from 'nookies';
import Router from 'next/router';
import { redirect } from 'next/dist/server/api-utils';


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


export default function login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [progress, setProgress]= useState(false);

  const dologin = async (e) => {
    e.preventDefault(); // prevent form from submitting normally

    setProgress(true);
    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email,  password })
    });
    
    const data = await res.json();
    console.log(data);

    if(data.token){
      nookies.set(null,'token',data.token);
      Router.replace('/dashboard');
    }

    setProgress(false);

  };

  return (      
    <div style={{color: '#0F2C67', backgroundColor: '#FFF7E9',minHeight:577}}>
    <div className="dropdown-menu" style={{ marginLeft: '200px'}}>
      <h1 style={{marginBottom: '5px', fontSize: '40px',  marginLeft: '150px', paddingTop: '50px'}}> Welcome in Catatan Aktivitasmu</h1>
      <h1 style={{fontSize: '20px', marginLeft: '325px', marginBottom: '30px'}}> Please login to your account</h1>
      <form onSubmit={dologin} className="px-4 py-3">
        <div className="mb-3" style={{marginLeft: '305px'}}>
          <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" style={{marginLeft: '46px'}} />
        </div>
        <div className="mb-3" style={{marginTop: '5px', marginLeft: '305px'}}>
          <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password: </label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" style={{marginLeft: '14px'}} />
        </div>
        <button type="submit" className="btn btn-primary" style={{color: '#ffff', fontSize: '15px', backgroundColor: '#0F2C67', marginLeft: '525px', marginTop: '15px'}}>Sign in</button>
      </form>
      <div className="dropdown-divider" />
      <Link href="/daftar">
      <u className="dropdown-item" href="#" style={{color: '#5F9DF7', fontSize: '12px', marginLeft: '445px'}}>New around here? Sign up</u>
      </Link>
    </div>
  </div>
  //   <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
  //   <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
  //     <h1 className="font-bold text-center text-2xl mb-5">LOGIN</h1>  
  //     <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
  //       <form onSubmit={dologin} className="px-5 py-7">
  //         <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
  //         <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
  //         <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
  //         <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
  //         <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
  //           <span className="inline-block mr-2">Login</span>
  //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  //           </svg>
  //         </button>
  //       </form>
  //       <div className="py-5">
  //         <div className="grid grid-cols-2 gap-1">
  //           <div className="text-center sm:text-left whitespace-nowrap">
  //             <Link href="/register">
  //             <div className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  //               </svg>
  //               <span className="inline-block ml-1">Register</span>
  //             </div>
  //             </Link>
  //           </div>
            
            
            
  //         </div>
  //       </div>
  //     </div>
  //     <div className="py-5">
  //       <div className="grid grid-cols-2 gap-1">
  //         <div className="text-center sm:text-left whitespace-nowrap">
            
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
    )
}

