"use client";

import { useEffect, useState } from "react";


export default function AdminPayrollPage(){

    const [employees,setEmployees] = useState<any[]>([]);
    const [payrolls,setPayrolls] = useState<any[]>([]);

    const [form,setForm] = useState({

        employeeId:"",
        basicSalary:"",
        bonus:"0",
        deductions:"0"

    });


    const [loading,setLoading] = useState(true);



    async function loadData(){

        const empRes = await fetch(
            "/api/admin/employees"
        );

        const empData = await empRes.json();


        const payrollRes = await fetch(
            "/api/payroll"
        );

        const payrollData = await payrollRes.json();



        setEmployees(empData);

        setPayrolls(payrollData);

        setLoading(false);

    }



    useEffect(()=>{

        loadData();

    },[]);





    function handleChange(e:any){

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }





    async function generatePayroll(e:any){

        e.preventDefault();


        const res = await fetch(
            "/api/admin/payroll",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(form)

            }
        );


        const data = await res.json();


        if(!res.ok){

            alert(data.message);

            return;

        }


        alert("Payroll generated");


        setForm({

            employeeId:"",
            basicSalary:"",
            bonus:"0",
            deductions:"0"

        });


        loadData();

    }





    if(loading){

        return <div className="p-6">
            Loading payroll...
        </div>

    }




return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Generate Payroll
</h1>



<form
onSubmit={generatePayroll}
className="space-y-4 bg-white p-5 rounded-xl shadow"
>



<select

name="employeeId"

value={form.employeeId}

onChange={handleChange}

className="text-gray-900 border p-2 w-full"

>

<option value="">
Select Employee
</option>


{
employees.map((emp)=>(

<option
key={emp.id}
value={emp.id}
>

{emp.user.name} - {emp.department?.name ?? "Not Assigned"}

</option>

))
}


</select>




<input

name="basicSalary"

type="number"

placeholder="Basic Salary"

value={form.basicSalary}

onChange={handleChange}

className="text-gray-900 border p-2 w-full"

/>




<input

name="bonus"

type="number"

placeholder="Bonus"

value={form.bonus}

onChange={handleChange}

className="text-gray-900 border p-2 w-full"

/>





<input

name="deductions"

type="number"

placeholder="Deductions"

value={form.deductions}

onChange={handleChange}

className="text-gray-900 border p-2 w-full"

/>




<button

className="bg-green-600 text-white px-5 py-2 rounded"

>

Generate Payroll

</button>



</form>



</div>

);


}