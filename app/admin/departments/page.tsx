"use client";

import { useEffect, useState } from "react";


export default function DepartmentsPage(){

    const [departments,setDepartments] = useState<any[]>([]);
    const [name,setName] = useState("");
    const [editingId,setEditingId] = useState<string | null>(null);
    const [loading,setLoading] = useState(false);



    async function fetchDepartments(){

        const res = await fetch("/api/departments");

        const data = await res.json();

        setDepartments(data);

    }



    useEffect(()=>{

        fetchDepartments();

    },[]);



    async function saveDepartment(e:React.FormEvent){

        e.preventDefault();


        if(!name) return;


        setLoading(true);


        if(editingId){

            await fetch(
                `/api/departments/${editingId}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name
                    })
                }
            );


        }else{


            await fetch(
                "/api/departments",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name
                    })
                }
            );


        }


        setName("");

        setEditingId(null);

        fetchDepartments();

        setLoading(false);

    }





    async function deleteDepartment(id:string){

        const confirmDelete =
        confirm(
            "Are you sure you want to delete this department?"
        );


        if(!confirmDelete) return;


        const res =
        await fetch(
            `/api/departments/${id}`,
            {
                method:"DELETE"
            }
        );


        const data = await res.json();


        if(!res.ok){

            alert(data.message);

        }


        fetchDepartments();

    }





    function editDepartment(dept:any){

        setEditingId(dept.id);

        setName(dept.name);

    }





return(

<div className="p-6">


<h1 className="text-2xl font-bold mb-6">
Departments
</h1>



<form
onSubmit={saveDepartment}
className="mb-6 flex gap-3"
>


<input

className="border p-2"

placeholder="Department name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>


<button
className="bg-blue-600 text-white px-4"
>

{
loading
?
"Saving..."
:
editingId
?
"Update"
:
"Add"
}

</button>


</form>





<table className="w-full border">


<thead>

<tr>

<th className="border p-2">
Name
</th>


<th className="border p-2">
Employees
</th>


<th className="border p-2">
Created At
</th>


<th className="border p-2">
Actions
</th>


</tr>

</thead>



<tbody>


{
departments.map((dept)=>(


<tr key={dept.id}>


<td className="border p-2">
{dept.name}
</td>


<td className="border p-2">
{dept._count.employees}
</td>


<td className="border p-2">
{
new Date(
dept.createdAt
).toLocaleDateString()
}
</td>



<td className="border p-2">


<button

onClick={()=>editDepartment(dept)}

className="mr-3 text-blue-600"

>

Edit

</button>



<button

onClick={()=>deleteDepartment(dept.id)}

className="text-red-600"

>

Delete

</button>


</td>


</tr>


))
}



</tbody>


</table>


</div>

)

}