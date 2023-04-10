/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import nookies from 'nookies';
import Router  from 'next/router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { headers } from '@/next.config';



export async function getServerSideProps(ctx){
    const cookies = nookies.get(ctx)
    if(!cookies.token){
      return{
        redirect:{
          destination : '/'
      }
      }
    }
    return{
      props: {
      
      }
    }
  }



export default function dashboard() {
    function logout(){
        nookies.destroy(null,'token');
        Router.replace('/');
    }
    function menuitem(){
      Router.push('/items');
  }
    const [data,setdata] = useState([]);

    useEffect(() => {
      const cookie = nookies.get('token');
      const cookies = cookie.token;
      console.log(cookie.token);

      const headers ={
        'Authorization': `Bearer ${cookies}`,
        'Content-Type': 'application/json',
      };
      axios.get('http://localhost:3000/api/user' ,{headers} )
        .then(response => {
          setdata(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);


    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowIndex) => {
      setSelectedRow(rowIndex);
    };
    const handleButtonClick = (item) => {
      setName(item.name);
      setEmail(item.email);
      setPassword(item.password);
      setId(item.id);
    };

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const Delete = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil DIhapus!');
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,email, name, password })
      });
      
      const data = await res.json();
      location.reload();
    };
    const Update = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil Di Update!');
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,email, name, password })
      });
      location.reload();
      const data = await res.json();
    };

    const Create = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil Di Buat!');
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password })
      });
      location.reload();
      const data = await res.json();
    };


  return (
    <section className="antialiased bg-gray-100 text-gray-600 ">
    <div className="flex flex-col justify-center h-full">
    <div className='flex justify-between'>
    <div className='mx-10 my-5'>
        <button type="submit" onClick={menuitem} className="hover:shadow-form rounded-md bg-[#06b6d4] py-3 px-8 text-base font-semibold text-white outline-none">
          Menu Item
        </button>
    </div>
    <div className='mx-10 my-5'>
        <button type="submit" onClick={logout} className="hover:shadow-form rounded-md bg-[#dc2626] py-3 px-8 text-base font-semibold text-white outline-none">
          logout
        </button>
    </div>
    </div>

    <div className="flex items-center justify-center p-12">
        {/* Author: FormBold Team */}
        {/* Learn More: https://formbold.com */}
        <div className="mx-auto w-full max-w-[550px]">
          <form >
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                nama
              </label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                Email Address
              </label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input type="text" name="subject" id="subject" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your subject" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <input type="hidden" value={id} ></input>
            <div className='flex flex-row gap-8'>
            <div>
              <button type="submit" onClick={Create} className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                Create
              </button>
            </div>
            <div>
              <button type="submit" onClick={Update} className="hover:shadow-form rounded-md bg-[#4ade80] py-3 px-8 text-base font-semibold text-black outline-none">
                Update
              </button>
            </div>
            <div>
              <button type="submit" onClick={Delete} className="hover:shadow-form rounded-md bg-[#dc2626] py-3 px-8 text-base font-semibold text-white outline-none">
                Delete
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
      {/* Table */}
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Customers</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table id='table' className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Password</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">UpdateAt</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Pilih</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
              {data.map((item,index) => (
                      <tr key={item.id} onClick={() => handleRowClick(index)}>
                        <td className="p-2 whitespace-nowrap">{item.name}</td>
                        <td className="p-2 whitespace-nowrap">{item.email}</td>
                        <td className="p-2 whitespace-nowrap">{item.password}</td>
                        <td className="p-2 whitespace-nowrap">{item.updatedAt}</td>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(item);
                        }} className="p-2 whitespace-nowrap hover:shadow-form rounded-md bg-[#6A64F1] py-1 px-2 text-base font-light text-white outline-none">
                          Pilih
                        </button>
                      </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
