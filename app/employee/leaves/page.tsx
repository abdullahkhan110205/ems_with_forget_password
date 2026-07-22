"use client";

import { useEffect, useState } from "react";


export default function EmployeeLeavesPage(){

    const [leaves,setLeaves] = useState<any[]>([]);

    const [reason,setReason] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const [loading,setLoading] = useState(true);
    const [message,setMessage] = useState("");



    async function loadLeaves(){

        const res = await fetch("/api/leaves");

        const data = await res.json();

        setLeaves(data);

        setLoading(false);

    }



    useEffect(()=>{

        loadLeaves();

    },[]);





    async function submitLeave(e:React.FormEvent){

        e.preventDefault();


        const res = await fetch(
            "/api/leaves",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({

                    reason,

                    startDate,

                    endDate

                })

            }
        );



        const data = await res.json();



        if(!res.ok){

            setMessage(data.message);

            return;

        }



        setMessage("Leave request submitted");


        setReason("");

        setStartDate("");

        setEndDate("");

        loadLeaves();


    }





    if(loading){

        return(
            <div className="text-gray-900 p-6">
                Loading leaves...
            </div>
        );

    }





    return(

        <div className="text-gray-900 p-6">


            <h1 className="text-2xl font-bold mb-6">
                My Leave Requests
            </h1>





            <form
            onSubmit={submitLeave}
            className="bg-white shadow rounded p-5 mb-8"
            >


                <h2 className="font-bold mb-4">
                    Apply For Leave
                </h2>




                <input

                className="border p-2 w-full mb-3"

                placeholder="Reason"

                value={reason}

                onChange={(e)=>setReason(e.target.value)}

                />





                <label>
                    Start Date
                </label>

                <input

                type="date"

                className="border p-2 w-full mb-3"

                value={startDate}

                onChange={(e)=>setStartDate(e.target.value)}

                />





                <label>
                    End Date
                </label>


                <input

                type="date"

                className="border p-2 w-full mb-3"

                value={endDate}

                onChange={(e)=>setEndDate(e.target.value)}

                />





                <button

                className="bg-blue-600 text-white px-4 py-2 rounded"

                >

                    Submit Request

                </button>




            </form>






            {
                message &&
                <p className="text-green-600 mb-4">
                    {message}
                </p>
            }







            <table className="w-full border">


                <thead>

                    <tr>

                        <th className="border p-2">
                            Reason
                        </th>

                        <th className="border p-2">
                            Start
                        </th>

                        <th className="border p-2">
                            End
                        </th>

                        <th className="border p-2">
                            Status
                        </th>

                    </tr>

                </thead>



                <tbody>


                {
                    leaves.map((leave)=>(


                        <tr key={leave.id}>


                            <td className="border p-2">
                                {leave.reason}
                            </td>


                            <td className="border p-2">
                                {new Date(
                                    leave.startDate
                                ).toLocaleDateString()}
                            </td>


                            <td className="border p-2">
                                {new Date(
                                    leave.endDate
                                ).toLocaleDateString()}
                            </td>


                            <td className="border p-2">
                                {leave.status}
                            </td>


                        </tr>


                    ))
                }


                </tbody>


            </table>



        </div>

    );

}