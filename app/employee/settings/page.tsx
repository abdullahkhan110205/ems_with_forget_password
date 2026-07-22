"use client";

import { useState } from "react";


export default function SettingsPage(){

    const [currentPassword,setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [message,setMessage] = useState("");



    async function changePassword(){


        const res = await fetch(
            "/api/employee/password",
            {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({

                    currentPassword,

                    newPassword

                })
            }
        );



        const data = await res.json();


        setMessage(data.message);



        if(res.ok){

            setCurrentPassword("");

            setNewPassword("");

        }


    }





    return(

        <div className="p-6">


            <h1 className="text-2xl font-bold mb-6">
                Account Settings
            </h1>




            <div className="bg-white shadow rounded-xl p-6 max-w-md">


                <label>
                    Current Password
                </label>


                <input

                type="password"

                className="border p-2 w-full mb-4"

                value={currentPassword}

                onChange={
                    e=>setCurrentPassword(e.target.value)
                }

                />





                <label>
                    New Password
                </label>


                <input

                type="password"

                className="border p-2 w-full mb-4"

                value={newPassword}

                onChange={
                    e=>setNewPassword(e.target.value)
                }

                />





                <button

                onClick={changePassword}

                className="bg-green-600 text-white px-4 py-2 rounded"

                >

                    Change Password

                </button>




                {
                    message &&

                    <p className="mt-4">

                        {message}

                    </p>
                }



            </div>


        </div>

    );

}