"use client";

import { useEffect, useState } from "react";


export default function AdminAttendancePage(){


    const [attendance,setAttendance] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);




    async function loadAttendance(){


        const res = await fetch(
            "/api/admin/attendance"
        );


        const data = await res.json();


        setAttendance(data);

        setLoading(false);


    }





    useEffect(()=>{

        loadAttendance();

    },[]);






    if(loading){

        return(

            <div className="p-6">

                Loading attendance report...

            </div>

        );

    }







    return(

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">

                Attendance Report

            </h1>






            <div className="bg-blue shadow rounded-xl p-5">


                <table className="w-full border">



                    <thead>


                        <tr>


                            <th className="border p-3">
                                Employee
                            </th>



                            <th className="border p-3">
                                Department
                            </th>



                            <th className="border p-3">
                                Status
                            </th>



                            <th className="border p-3">
                                Check In
                            </th>



                            <th className="border p-3">
                                Check Out
                            </th>



                        </tr>


                    </thead>








                    <tbody>


                    {

                    attendance.map((employee)=>(


                        <tr key={employee.id}>


                            <td className="border p-3">

                                {employee.name}

                            </td>





                            <td className="border p-3">

                                {employee.department}

                            </td>






                            <td className="border p-3">


                                {

                                employee.attendance

                                ?

                                <span className="text-green-600 font-semibold">

                                    Present

                                </span>


                                :


                                <span className="text-red-600 font-semibold">

                                    Absent

                                </span>

                                }


                            </td>








                            <td className="border p-3">


                            {

                            employee.attendance?.checkIn

                            ?

                            new Date(
                                employee.attendance.checkIn
                            ).toLocaleTimeString()

                            :

                            "-"

                            }


                            </td>








                            <td className="border p-3">


                            {

                            employee.attendance?.checkOut

                            ?

                            new Date(
                                employee.attendance.checkOut
                            ).toLocaleTimeString()

                            :

                            "-"

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