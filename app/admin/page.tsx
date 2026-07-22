"use client";

import { useEffect, useState } from "react";


export default function AdminDashboard(){


    const [data,setData] = useState<any>(null);
    const [loading,setLoading] = useState(true);



    async function loadDashboard(){


        const res = await fetch(
            "/api/admin/dashboard"
        );


        const result = await res.json();


        setData(result);

        setLoading(false);


    }





    useEffect(()=>{

        loadDashboard();

    },[]);






    if(loading){

        return(

            <div className="p-6">
                Loading dashboard...
            </div>

        );

    }






    const cards = [

        {
            title:"Total Employees",
            value:data.totalEmployees,
            color:"bg-blue-500"
        },


        {
            title:"Departments",
            value:data.totalDepartments,
            color:"bg-purple-500"
        },


        {
            title:"Present Today",
            value:data.presentToday,
            color:"bg-green-500"
        },


        {
            title:"Pending Leaves",
            value:data.pendingLeaves,
            color:"bg-yellow-500"
        },


        {
            title:"Approved Leaves",
            value:data.approvedLeaves,
            color:"bg-green-600"
        },


        {
            title:"Rejected Leaves",
            value:data.rejectedLeaves,
            color:"bg-red-500"
        },


        {
            title:"Payroll Total",
            value:data.totalPayroll,
            color:"bg-indigo-500"
        }

    ];







    return(


        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">

                Admin Dashboard

            </h1>





            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


            {

            cards.map((card)=>(


                <div

                key={card.title}

                className="bg-white shadow rounded-xl p-5"

                >


                    <div

                    className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3`}

                    >

                        {card.value}

                    </div>



                    <p className="text-gray-600">

                        {card.title}

                    </p>



                </div>


            ))

            }


            </div>



        </div>


    );


}