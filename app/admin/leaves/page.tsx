"use client";

import { useEffect, useState } from "react";


export default function AdminLeavesPage(){

    const [leaves,setLeaves] = useState<any[]>([]);
    const [stats,setStats] = useState<any>(null);

    const [filter,setFilter] = useState("ALL");

    const [loading,setLoading] = useState(true);




    async function loadLeaves(){

        const res = await fetch(
            "/api/admin/leaves"
        );


        const data = await res.json();


        setLeaves(data);

        setLoading(false);

    }





    async function loadStats(){

        const res = await fetch(
            "/api/admin/leaves/stats"
        );


        const data = await res.json();


        setStats(data);

    }







    useEffect(()=>{


        loadLeaves();

        loadStats();


    },[]);







    async function updateLeave(id:string,status:string){


        await fetch(

            `/api/admin/leaves/${id}`,

            {
                method:"PATCH",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    status

                })

            }

        );


        loadLeaves();

        loadStats();

    }







    if(loading){

        return(

            <div className="p-6">

                Loading leaves...

            </div>

        );

    }







    const filteredLeaves =

    filter==="ALL"

    ?

    leaves

    :

    leaves.filter(
        (leave)=>
        leave.status===filter
    );







    return(

        <div className="p-6">



            <h1 className="text-3xl font-bold mb-6">

                Leave Management

            </h1>






            {/* Stats */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">



                <div className="bg-yellow-500 text-white rounded-xl p-5">

                    <h2 className="font-bold">
                        Pending
                    </h2>

                    <p className="text-3xl">
                        {stats?.pending}
                    </p>

                </div>





                <div className="bg-green-600 text-white rounded-xl p-5">

                    <h2 className="font-bold">
                        Approved
                    </h2>

                    <p className="text-3xl">
                        {stats?.approved}
                    </p>

                </div>





                <div className="bg-red-600 text-white rounded-xl p-5">

                    <h2 className="font-bold">
                        Rejected
                    </h2>

                    <p className="text-3xl">
                        {stats?.rejected}
                    </p>

                </div>


            </div>









            {/* Filters */}

            <div className="text-gray-900 flex gap-3 mb-5">


                {
                ["ALL","PENDING","APPROVED","REJECTED"]
                .map((item)=>(


                    <button

                    key={item}

                    onClick={()=>setFilter(item)}

                    className="px-4 py-2 rounded bg-gray-200"

                    >

                        {item}

                    </button>


                ))
                }


            </div>









            {/* Table */}

            <div className="text-gray-900 bg-white shadow rounded-xl p-5">


            <table className="w-full border">



            <thead>

                <tr>

                    <th className="border p-2">
                        Employee
                    </th>

                    <th className="border p-2">
                        Reason
                    </th>

                    <th className="border p-2">
                        Dates
                    </th>

                    <th className="border p-2">
                        Status
                    </th>

                    <th className="border p-2">
                        Action
                    </th>

                </tr>

            </thead>





            <tbody>


            {

            filteredLeaves.map((leave)=>(


                <tr key={leave.id}>


                    <td className="text-gray-900 border p-2">

                        {leave.employee.user.name}

                    </td>




                    <td className="border p-2">

                        {leave.reason}

                    </td>





                    <td className="border p-2">

                        {
                        new Date(
                            leave.startDate
                        ).toLocaleDateString()
                        }

                        {" - "}

                        {
                        new Date(
                            leave.endDate
                        ).toLocaleDateString()
                        }

                    </td>





                    <td className="border p-2">

                        {leave.status}

                    </td>





                    <td className="border p-2">


                    {
                    leave.status==="PENDING" &&

                    <div className="flex gap-2">


                        <button

                        onClick={()=>updateLeave(
                            leave.id,
                            "APPROVED"
                        )}

                        className="bg-green-600 text-white px-3 py-1 rounded"

                        >

                            Approve

                        </button>




                        <button

                        onClick={()=>updateLeave(
                            leave.id,
                            "REJECTED"
                        )}

                        className="bg-red-600 text-white px-3 py-1 rounded"

                        >

                            Reject

                        </button>


                    </div>

                    }


                    </td>


                </tr>


            ))

            }


            </tbody>



            </table>


            </div>





        </div>

    );


}