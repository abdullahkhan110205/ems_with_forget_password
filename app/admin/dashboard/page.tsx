"use client";

import { useEffect, useState } from "react";


export default function AdminDashboard(){


    const [data,setData] = useState<any>(null);



    useEffect(()=>{


        async function loadDashboard(){

            const res =
            await fetch("/api/dashboard");


            const result =
            await res.json();


            setData(result);

        }


        loadDashboard();


    },[]);




    if(!data){

        return(

            <div className="p-6">

                Loading dashboard...

            </div>

        );

    }





return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-8">

Admin Dashboard

</h1>




<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">



<div className="border rounded p-6">

<h2 className="text-gray-600">

Total Employees

</h2>


<p className="text-3xl font-bold">

{data.totalEmployees}

</p>


</div>





<div className="border rounded p-6">


<h2 className="text-gray-600">

Total Departments

</h2>


<p className="text-3xl font-bold">

{data.totalDepartments}

</p>


</div>



</div>






<h2 className="text-2xl font-bold mb-4">

Recent Employees

</h2>





<table className="w-full border">


<thead>

<tr>

<th className="border p-2">
Name
</th>


<th className="border p-2">
Department
</th>


<th className="border p-2">
Position
</th>


<th className="border p-2">
Joining Date
</th>


</tr>


</thead>



<tbody>



{
data.recentEmployees.map(
(employee:any)=>(


<tr key={employee.id}>


<td className="border p-2">

{employee.user.name}

</td>



<td className="border p-2">

{employee.department?.name || "Not Assigned"}

</td>



<td className="border p-2">

{employee.position}

</td>




<td className="border p-2">

{
new Date(
employee.joinedAt
).toLocaleDateString()
}

</td>



</tr>


))
}



</tbody>


</table>



</div>

)


}