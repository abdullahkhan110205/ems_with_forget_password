"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CompleteProfile(){

const router = useRouter();


const [departments,setDepartments]=useState([]);

const [departmentId,setDepartmentId]=useState("");
const [position,setPosition]=useState("");
const [salary,setSalary]=useState("");



useEffect(()=>{

fetch("/api/departments")
.then(res=>res.json())
.then(data=>setDepartments(data));

},[]);



async function submitProfile(e:any){

e.preventDefault();


await fetch("/api/employee/profile",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

departmentId,
position,
salary:Number(salary)

})

});


router.push("/employee/dashboard");


}



return(

<div className="min-h-screen flex items-center justify-center">


<form 
onSubmit={submitProfile}
className="bg-white shadow p-8 rounded w-96"
>


<h1 className="text-xl font-bold mb-5">
Complete Profile
</h1>



<select

className="border p-2 w-full mb-3"

onChange={(e)=>setDepartmentId(e.target.value)}

>

<option>
Select Department
</option>


{
departments.map((d:any)=>(

<option key={d.id} value={d.id}>
{d.name}
</option>

))
}


</select>



<input

className="border p-2 w-full mb-3"

placeholder="Position"

onChange={(e)=>setPosition(e.target.value)}

/>



<input

className="border p-2 w-full mb-3"

placeholder="Salary"

type="number"

onChange={(e)=>setSalary(e.target.value)}

/>



<button

className="bg-green-600 text-white p-2 w-full"

>

Save Profile

</button>


</form>


</div>


)

}