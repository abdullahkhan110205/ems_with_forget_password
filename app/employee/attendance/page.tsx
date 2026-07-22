"use client";

import { useEffect, useState } from "react";


export default function AttendancePage(){

    const [attendance,setAttendance] = useState<any[]>([]);
    const [todayAttendance,setTodayAttendance] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const [message,setMessage] = useState("");





    async function loadAttendance(){

        const res = await fetch(
            "/api/employee/attendance"
        );


        const data = await res.json();


        setAttendance(data);

        setLoading(false);

    }






    async function loadTodayAttendance(){

        const res = await fetch(
            "/api/employee/attendance/today"
        );


        const data = await res.json();


        setTodayAttendance(data);

    }







    useEffect(()=>{

        loadAttendance();

        loadTodayAttendance();

    },[]);









    async function checkIn(){


        const res = await fetch(

            "/api/attendance/checkin",

            {
                method:"POST"
            }

        );



        const data = await res.json();



        if(!res.ok){

            setMessage(data.message);

            return;

        }




        setMessage(
            "Checked in successfully"
        );


        loadAttendance();

        loadTodayAttendance();


    }









    async function checkOut(){


        const res = await fetch(

            "/api/attendance/checkout",

            {
                method:"POST"
            }

        );



        const data = await res.json();



        if(!res.ok){

            setMessage(data.message);

            return;

        }




        setMessage(
            "Checked out successfully"
        );


        loadAttendance();

        loadTodayAttendance();


    }









    if(loading){

        return(

            <div className="text-gray-900 p-6">

                Loading attendance...

            </div>

        );

    }







    return(

        <div className=" text-gray-900p-6">



            <h1 className="text-gray-900 text-2xl font-bold mb-6">
                My Attendance
            </h1>







            {/* Today's Status Card */}

            <div className="bg-white shadow rounded-xl p-5 mb-6">


                <h2 className="text-gray-900 text-xl font-bold mb-3">
                    Today's Status
                </h2>




                {
                todayAttendance

                ?


                <div>


                    <p className="text-green-600 font-semibold">

                        🟢 Checked In

                    </p>



                    <p>

                        Check In:

                        {
                        new Date(
                            todayAttendance.checkIn
                        ).toLocaleTimeString()

                        }

                    </p>





                    <p>

                        Check Out:

                        {

                        todayAttendance.checkOut

                        ?

                        new Date(
                            todayAttendance.checkOut
                        ).toLocaleTimeString()

                        :

                        "Not checked out"

                        }

                    </p>



                </div>



                :


                <p className="text-gray-500">

                    ⚪ Not Checked In Today

                </p>


                }



            </div>









            {/* Buttons */}


            <div className="flex gap-3 mb-4">



                <button

                onClick={checkIn}

                className="text-gray-900 bg-green-600 text-white px-5 py-2 rounded"

                >

                    Check In

                </button>





                <button

                onClick={checkOut}

                className="bg-red-600 text-white px-5 py-2 rounded"

                >

                    Check Out

                </button>



            </div>








            {
            message &&

            <p className="mb-4 text-blue-600">

                {message}

            </p>

            }









            {/* Attendance History Table */}


            <div className="text-gray-900 bg-white shadow rounded-xl p-4">



                <h2 className="text-gray-900 text-xl font-bold mb-4">

                    Attendance History

                </h2>





                <table className="w-full border">



                    <thead>


                        <tr>


                            <th className="border p-2">
                                Date
                            </th>



                            <th className="border p-2">
                                Check In
                            </th>




                            <th className="border p-2">
                                Check Out
                            </th>



                        </tr>


                    </thead>







                    <tbody>


                    {

                    attendance.map((item)=>(


                        <tr key={item.id}>


                            <td className="border p-2">


                                {
                                new Date(
                                    item.date
                                ).toLocaleDateString()
                                }


                            </td>







                            <td className="border p-2">


                                {

                                item.checkIn

                                ?

                                new Date(
                                    item.checkIn
                                ).toLocaleTimeString()

                                :

                                "-"

                                }


                            </td>







                            <td className="border p-2">


                                {

                                item.checkOut

                                ?

                                new Date(
                                    item.checkOut
                                ).toLocaleTimeString()

                                :

                                "Not checked out"

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