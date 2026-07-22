"use client";

import { useEffect, useState } from "react";


interface Project {

    id:string;

    name:string;

    description:string | null;

    startDate:string;

    deadline:string;

}



export default function EmployeeProjectsPage(){


    const [projects,setProjects] = useState<Project[]>([]);



    useEffect(()=>{

        fetchProjects();

    },[]);



    async function fetchProjects(){


        // Temporary
        // Replace later with logged-in employee id

        const employeeId =
        "cmroy4vnw0003ndfsc3zpuhrb";



        const res = await fetch(
            "/api/employee/projects",
            {

                headers:{

                    employeeId

                }

            }
        );


        const data = await res.json();
        console.log("API RESPONSE:", data);



        const projectsList = data.map(
            (item:any)=>item.project
        );


        setProjects(projectsList);


    }




return (

<div>


<h1 className="text-gray-900 text-2xl font-bold mb-6">

📂 My Projects

</h1>




{
projects.length === 0 && (

<p className="mt-2 text-gray-900">
No projects assigned yet.
</p>

)
}





<div className="grid gap-5">


{

projects.map(project=>(


<div

key={project.id}

className="bg-white shadow rounded-lg p-5"

>


<h2 className="text-xl font-semibold">

{project.name}

</h2>



<p className="mt-2 text-gray-600">

{project.description || "No description"}

</p>




<div className="mt-4">

<p>

<b>Start Date:</b>{" "}

{
new Date(project.startDate)
.toLocaleDateString()
}

</p>



<p>

<b>Deadline:</b>{" "}

{
new Date(project.deadline)
.toLocaleDateString()
}

</p>


</div>


</div>


))


}



</div>


</div>

);


}