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
      // console.log(cookie.token);

      const headers ={
        'Authorization': `Bearer ${cookies}`,
        'Content-Type': 'application/json',
      };
      axios.get('http://localhost:3000/api/item' ,{headers} )
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
      setPlace(item.place);
      setTime(item.time);
      setId(item.id);
    };

    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [id, setId] = useState('');

    const Delete = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil DIhapus!');
      const res = await fetch('http://localhost:3000/api/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token:"My-Lover",id})
      });
      const data = await res.json();
      location.reload();
    };
    const Update = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil Di Update!');
      const res = await fetch('http://localhost:3000/api/data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,time ,name, place,token:"My-Lover" })
      });
      location.reload();
      const data = await res.json();
    };

    const Create = async (e) => {
      e.preventDefault(); // prevent form from submitting normally
      alert('Akun Berhasil Di Buat!');
      const res = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time, name, place,token:"My-Lover" })
      });
      const data = await res.json();
      console.log(data)
      location.reload();
    };


  return (
    <section className="antialiased  text-gray-600 ">
    <div className="flex flex-col justify-center h-full">
    <div className='mx-10 my-5 flex justify-end'>
        <button type="submit" onClick={logout} className="bg-[#dc2626] hover:shadow-form rounded-md  py-3 px-8 text-base font-semibold text-white outline-none">
          logout
        </button>
    </div>
    <form className="px-4 py-3">
          <div className="mb-3" style={{marginLeft: '50px', marginTop: '5px'}}>
          <h1 style={{marginBottom: '2px', color:'#0F2C67' , fontSize: '40px'}}> Catatan Aktivitasmu</h1>
          <h2 style={{fontSize: '15px', color:'#0F2C67',  marginBottom: '20px'}}> Please enter your activity data</h2>
            <label htmlFor="time" className="form-label">Time:</label>
            <input type="text" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} id="exampleDropdownFormEmail1" placeholder="dd/mm/yy xx.xx AM/PM" style={{marginLeft: '31px'}} />
          </div>
          <div className="mb-3" style={{marginLeft: '50px', marginTop: '5px'}}>
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Name:</label>
            <input type="text" className="form-control" id="exampleDropdownFormEmail1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your activity name" style={{marginLeft: '23px' }} />
          </div>
          <div className="mb-3" style={{marginTop: '5px', marginLeft: '50px'}}>
            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Place: </label>
            <input type="place" className="form-control" id="exampleDropdownFormPassword1" placeholder="Place of activity" value={place} onChange={(e) => setPlace(e.target.value)} style={{marginLeft: '24px'}} />
          </div>
          <div className='flex'>
          <button type="submit" onClick={Create} className="btn btn-primary" style={{color: '#ffff', fontSize: '15px', backgroundColor: '#0F2C67', marginLeft: '9.3%'}}>Create</button>
          <button type="submit" onClick={Update} className="btn btn-primary" className='bg-[#4ade80]' style={{color: '#ffff', fontSize: '15px', marginLeft: '2%'}}>Update</button>
          <button type="submit" onClick={Delete} className="btn btn-primary" className='bg-[#dc2626]' style={{color: '#ffff', fontSize: '15px', marginLeft: '2%'}}>Delete</button>
          </div>
        </form>
      {/* Table */}
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-yellow-950">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">List Aktivitasmu</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table id='table' className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 ">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Time</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Place</div>
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
                        <td className="p-2 whitespace-nowrap">{item.time}</td>
                        <td className="p-2 whitespace-nowrap">{item.place}</td>
                        <td className="p-2 whitespace-nowrap">{item.updatedAt}</td>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(item);
                        }} className="p-2 whitespace-nowrap hover:shadow-form rounded-md bg-yellow-950 py-1 px-2 text-base font-light text-white outline-none">
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
