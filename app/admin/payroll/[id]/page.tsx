"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditPayrollPage(){


    const params = useParams();
    const router = useRouter();

    const id = params.id as string;



    const [loading,setLoading] = useState(true);



    const [formData,setFormData] = useState({

        billingDate:"",
        basicSalary:"",
        bonus:"",
        deductions:""

    });





    useEffect(()=>{

        loadPayroll();

    },[]);





    async function loadPayroll(){

        const res =
        await fetch(
            `/api/payroll/${id}`
        );


        const data =
        await res.json();



        setFormData({

            billingDate:
            data.billingDate.split("T")[0],

            basicSalary:
            data.basicSalary.toString(),

            bonus:
            data.bonus.toString(),

            deductions:
            data.deductions.toString()

        });


        setLoading(false);

    }






    function handleChange(
        e:React.ChangeEvent<HTMLInputElement>
    ){

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    }







    async function updatePayroll(
        e:React.FormEvent
    ){

        e.preventDefault();



        const res =
        await fetch(
            `/api/payroll/${id}`,
            {

                method:"PATCH",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(formData)

            }
        );



        const data =
        await res.json();



        if(res.ok){

            alert(
                "Payroll updated"
            );


            router.push(
                "/admin/payroll"
            );

        }
        else{

            alert(data.message);

        }


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

Edit Payroll

</h1>




<form

onSubmit={updatePayroll}

className="space-y-4"

>




<input

type="date"

name="billingDate"

value={formData.billingDate}

onChange={handleChange}

className="border p-2 w-full"

/>





<input

type="number"

name="basicSalary"

value={formData.basicSalary}

onChange={handleChange}

placeholder="Basic Salary"

className="border p-2 w-full"

/>





<input

type="number"

name="bonus"

value={formData.bonus}

onChange={handleChange}

placeholder="Bonus"

className="border p-2 w-full"

/>





<input

type="number"

name="deductions"

value={formData.deductions}

onChange={handleChange}

placeholder="Deductions"

className="border p-2 w-full"

/>





<button

className="bg-blue-600 text-white px-4 py-2"

>

Update Payroll

</button>



</form>



</div>

)


}