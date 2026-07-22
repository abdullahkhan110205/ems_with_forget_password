"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AddPayrollPage(){


    const router = useRouter();


    const [employees,setEmployees] = useState<any[]>([]);


    const [formData,setFormData] = useState({

        employeeId:"",

        billingDate:"",

        basicSalary:"",

        bonus:"0",

        deductions:"0"

    });



    useEffect(()=>{

        loadEmployees();

    },[]);




    async function loadEmployees(){

        const res =
        await fetch("/api/employees");


        const data =
        await res.json();


        setEmployees(data);

    }




    function handleChange(
        e:React.ChangeEvent<
        HTMLInputElement |
        HTMLSelectElement
        >
    ){

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });

    }






    async function submitPayroll(
        e:React.FormEvent
    ){

        e.preventDefault();



        const res =
        await fetch(
            "/api/payroll",
            {

                method:"POST",

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
                "Payroll created"
            );


            router.push(
                "/admin/payroll"
            );


        }
        else{

            alert(data.message);

        }


    }





return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">

Add Payroll

</h1>



<form
onSubmit={submitPayroll}
className="space-y-4"
>




<select

name="employeeId"

value={formData.employeeId}

onChange={handleChange}

className="border p-2 w-full"

>


<option value="">

Select Employee

</option>


{

employees.map((employee)=>(


<option

key={employee.id}

value={employee.id}

>

{employee.user.name}

</option>


))

}


</select>





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

placeholder="Basic Salary"

value={formData.basicSalary}

onChange={handleChange}

className="border p-2 w-full"

/>





<input

type="number"

name="bonus"

placeholder="Bonus"

value={formData.bonus}

onChange={handleChange}

className="border p-2 w-full"

/>





<input

type="number"

name="deductions"

placeholder="Deductions"

value={formData.deductions}

onChange={handleChange}

className="border p-2 w-full"

/>





<button

className="bg-blue-600 text-white px-4 py-2"

>

Create Payroll

</button>



</form>



</div>

)


}