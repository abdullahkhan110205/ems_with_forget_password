"use client";

import { useEffect, useState } from "react";


export default function EmployeeProfilePage(){

    const [profile,setProfile] = useState<any>(null);
    const [loading,setLoading] = useState(true);



    async function loadProfile(){

        const res = await fetch(
            "/api/employee/profile"
        );


        const data = await res.json();


        setProfile(data);

        setLoading(false);

    }




    useEffect(()=>{

        loadProfile();

    },[]);





    if(loading){

        return(
            <div className="p-6">
                Loading profile...
            </div>
        );

    }





    return(

        <div className="p-6">


            <h1 className="text-gray-900 text-2xl font-bold mb-6">
                My Profile
            </h1>





            <div className="bg-white shadow rounded-xl p-6 max-w-xl">


                <div className="text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Name
                    </h2>

                    <p>
                        {profile.name}
                    </p>

                </div>





                <div className="text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Email
                    </h2>

                    <p>
                        {profile.email}
                    </p>

                </div>





                <div className="text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Department
                    </h2>

                    <p>
                        {profile.department}
                    </p>

                </div>





                <div className="text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Position
                    </h2>

                    <p>
                        {profile.position}
                    </p>

                </div>





                <div className=" text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Joining Date
                    </h2>

                    <p>
                        {
                        new Date(
                            profile.joinedAt
                        ).toLocaleDateString()
                        }
                    </p>

                </div>





                <div className="text-gray-900 mb-4">

                    <h2 className="font-semibold text-gray-600">
                        Salary
                    </h2>

                    <p>
                        {profile.salary}
                    </p>

                </div>



            </div>


        </div>

    );

}