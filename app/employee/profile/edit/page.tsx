"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function EditProfilePage(){


    const router = useRouter();


    const [employee,setEmployee] = useState<any>(null);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const [loading,setLoading] = useState(true);

    const [message,setMessage] = useState("");





    async function loadProfile(){


        const res = await fetch(
            "/api/employee/profile"
        );


        const data = await res.json();



        setEmployee(data);

        setName(data.name);

        setEmail(data.email);


        setLoading(false);


    }







    useEffect(()=>{

        loadProfile();

    },[]);








    async function updateProfile(){


        const res = await fetch(

            "/api/employee/profile",

            {

                method:"PATCH",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    name,

                    email

                })

            }

        );



        const data = await res.json();



        if(!res.ok){

            setMessage(
                data.message || "Update failed"
            );

            return;

        }




        setMessage(
            "Profile updated successfully"
        );


        setTimeout(()=>{

            router.push("/employee/profile");

        },1000);


    }









    if(loading){

        return(

            <div className="p-6">

                Loading...

            </div>

        );

    }








    return(

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">

                Edit Profile

            </h1>







            <div className="bg-white shadow rounded-xl p-6 max-w-xl">



                <label className="block mb-2">

                    Name

                </label>


                <input

                value={name}

                onChange={(e)=>setName(e.target.value)}

                className="border p-2 w-full rounded mb-4"

                />







                <label className="block mb-2">

                    Email

                </label>


                <input

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

                className="border p-2 w-full rounded mb-4"

                />







                <button

                onClick={updateProfile}

                className="bg-green-600 text-white px-5 py-2 rounded"

                >

                    Save Changes

                </button>







                {
                    message &&

                    <p className="mt-4 text-blue-600">

                        {message}

                    </p>
                }





            </div>



        </div>

    );

}