"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditEmployeePage(){

    const params = useParams();
    const router = useRouter();

    const id = params.id as string;


    const [departments,setDepartments] = useState<any[]>([]);

    const [loading,setLoading] = useState(true);



    const [formData,setFormData] = useState({

        name:"",
        departmentId:"",
        position:"",
        joinedAt:"",
        salary:""

    });




    useEffect(()=>{

        loadEmployee();

        loadDepartments();

    },[]);





   async function loadEmployee(){

    try {
        const res = await fetch(`/api/admin/employees/${id}`);

        if (!res.ok) {
            console.error("Failed to fetch employee:", res.status);
            setLoading(false);
            return;
        }

        const data = await res.json();

        setFormData({
            name: data.user?.name ?? "",
            departmentId: data.departmentId ?? "",
            position: data.position ?? "",
            joinedAt: data.joinedAt ? data.joinedAt.split("T")[0] : "",
            salary: data.salary != null ? data.salary.toString() : ""
        });

    } catch (err) {
        console.error("Error loading employee:", err);
    } finally {
        setLoading(false);
    }
}




    async function loadDepartments(){

        const res =
        await fetch(
            "/api/departments"
        );


        const data =
        await res.json();


        setDepartments(data);

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





    async function updateEmployee(
        e:React.FormEvent
    ){

        e.preventDefault();



        const res =
        await fetch(
            `/api/admin/employees/${id}`,
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
                "Employee updated successfully"
            );


            router.push(
                "/admin/employees"
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


<h1 className="text-2xl font-bold mb-6">
Edit Employee
</h1>



<form
onSubmit={updateEmployee}
className="space-y-4"
>



<input

name="name"

value={formData.name}

onChange={handleChange}

className="border p-2 w-full"

placeholder="Name"

/>




<select

name="departmentId"

value={formData.departmentId}

onChange={handleChange}

className="border p-2 w-full"

>


<option value="">
Select Department
</option>



{
departments.map((dept)=>(

<option

key={dept.id}

value={dept.id}

>

{dept.name}

</option>

))
}


</select>





<input

name="position"

value={formData.position}

onChange={handleChange}

className="border p-2 w-full"

placeholder="Position"

/>





<input

type="date"

name="joinedAt"

value={formData.joinedAt}

onChange={handleChange}

className="border p-2 w-full"

/>





<input

type="number"

name="salary"

value={formData.salary}

onChange={handleChange}

className="border p-2 w-full"

placeholder="Salary"

/>





<button

className="bg-blue-600 text-white px-4 py-2"

>

Update Employee

</button>



</form>


</div>

)

}