"use client";

import { useEffect, useState } from "react";


export default function EmployeeForm(){

    const [departments,setDepartments] = useState<any[]>([]);


    const [formData,setFormData] = useState({

        name:"",
        email:"",
        password:"",
        departmentId:"",
        position:"",
        joinedAt:"",
        salary:""

    });



    useEffect(()=>{

        async function loadDepartments(){

            const res =
            await fetch("/api/departments");

            const data =
            await res.json();

            setDepartments(data);

        }


        loadDepartments();


    },[]);




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





    async function handleSubmit(
        e:React.FormEvent
    ){

        e.preventDefault();


        const res =
        await fetch(
            "/api/admin/employees",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(formData)

            }
        );



        const data =
        await res.json();



        if(res.ok){

            alert("Employee created");


            setFormData({

                name:"",
                email:"",
                password:"",
                departmentId:"",
                position:"",
                joinedAt:"",
                salary:""

            });


        }
        else{

            alert(data.message);

        }


    }




return(

<form
onSubmit={handleSubmit}
className="space-y-4"
>


<input

name="name"

placeholder="Name"

value={formData.name}

onChange={handleChange}

/>



<input

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

/>



<input

name="password"

type="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

/>




<select

name="departmentId"

value={formData.departmentId}

onChange={handleChange}

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

placeholder="Position"

value={formData.position}

onChange={handleChange}

/>




<input

name="joinedAt"

type="date"

value={formData.joinedAt}

onChange={handleChange}

/>




<input

name="salary"

type="number"

placeholder="Salary"

value={formData.salary}

onChange={handleChange}

/>




<button
type="submit"
className="bg-blue-600 text-white px-4 py-2"
>

Add Employee

</button>



</form>

)

}