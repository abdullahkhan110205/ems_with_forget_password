"use client";

import { useEffect, useState } from "react";


interface Employee {

    id:string;

    user:{
        name:string;
        email:string;
    };

    department:{
        name:string;
    };

}


interface Project {

    id:string;

    name:string;

    startDate:string;

    deadline:string;

    employees:{
        employee:{
            user:{
                name:string;
            }
        }
    }[];

}



export default function ProjectsPage(){


    const [employees,setEmployees] = useState<Employee[]>([]);

    const [projects,setProjects] = useState<Project[]>([]);


    const [name,setName] = useState("");

    const [startDate,setStartDate] = useState("");

    const [deadline,setDeadline] = useState("");


    const [selectedEmployees,setSelectedEmployees] = useState<string[]>([]);



    useEffect(()=>{

        fetchEmployees();

        fetchProjects();

    },[]);



    async function fetchEmployees(){

        const res = await fetch(
            "/api/admin/employees"
        );

        const data = await res.json();

        setEmployees(data);

    }



    async function fetchProjects(){

        const res = await fetch(
            "/api/admin/projects"
        );

        const data = await res.json();

        setProjects(data);

    }




    function toggleEmployee(id:string){


        if(selectedEmployees.includes(id)){


            setSelectedEmployees(

                selectedEmployees.filter(
                    emp=>emp!==id
                )

            );


        }else{


            setSelectedEmployees([

                ...selectedEmployees,

                id

            ]);

        }

    }




    async function createProject(){


        if(selectedEmployees.length===0){

            alert(
                "Select at least one employee"
            );

            return;

        }


        const res = await fetch(
            "/api/admin/projects",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    name,

                    startDate,

                    deadline,

                    employeeIds:selectedEmployees

                })

            }
        );


        if(res.ok){


            alert(
                "Project created"
            );


            setName("");

            setStartDate("");

            setDeadline("");

            setSelectedEmployees([]);


            fetchProjects();


        }else{


            alert(
                "Failed to create project"
            );

        }


    }




return (

<div className="p-6">


<h1 className="text-2xl font-bold mb-6">
    Projects
</h1>



<div className="border p-5 rounded-lg">


<h2 className="text-lg font-semibold mb-4">
Create Project
</h2>



<input

className="border p-2 w-full mb-3"

placeholder="Project Name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>



<input

type="date"

className="border p-2 w-full mb-3"

value={startDate}

onChange={
e=>setStartDate(e.target.value)
}

/>



<input

type="date"

className="border p-2 w-full mb-3"

value={deadline}

onChange={
e=>setDeadline(e.target.value)
}

/>



<h3 className="font-semibold mb-2">
Assign Employees
</h3>



<div className="space-y-2">


{
employees.map(emp=>(


<label
key={emp.id}
className="flex gap-2"
>


<input

type="checkbox"

checked={
selectedEmployees.includes(emp.id)
}

onChange={()=>
toggleEmployee(emp.id)
}

/>


<span>

{emp.user.name}

(
{emp.department?.name ?? "Not Assigned"}
)

</span>


</label>


))
}


</div>




<button

onClick={createProject}

className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"

>

Create Project

</button>


</div>





<div className="mt-8">


<h2 className="text-xl font-bold mb-4">
Existing Projects
</h2>



<table className="border w-full">


<thead>

<tr>

<th className="border p-2">
Project Name
</th>

<th className="border p-2">
Assigned Employees
</th>

<th className="border p-2">
Start
</th>

<th className="border p-2">
Deadline
</th>

</tr>

</thead>



<tbody>


{
projects.map(project=>(

<tr key={project.id}>

<td className="border p-2">
{project.name}
</td>


<td className="border p-2">

{
project.employees.map((item,index)=>(

<div key={index}>
{item.employee.user.name}
</div>

))
}

</td>



<td className="border p-2">
{
new Date(project.startDate)
.toLocaleDateString()
}
</td>



<td className="border p-2">
{
new Date(project.deadline)
.toLocaleDateString()
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