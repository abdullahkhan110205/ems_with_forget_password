"use client";

import { useEffect, useState } from "react";


export default function EmployeesPage(){

    const [employees,setEmployees] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);



    async function fetchEmployees(){

        const res = await fetch("/api/admin/employees");

        const data = await res.json();

        setEmployees(data);

        setLoading(false);

    }



    useEffect(()=>{

        fetchEmployees();

    },[]);




    if(loading){

        return(
            <div className="p-6">
                Loading employees...
            </div>
        );

    }

async function deleteEmployee(id:string){

    const confirmDelete =
    confirm(
        "Are you sure you want to delete this employee?"
    );


    if(!confirmDelete) return;



    const res =
    await fetch(
    `/api/admin/employees/${id}`,
    {
        method:"DELETE"
    }
);



    const data =
    await res.json();



    if(!res.ok){

        alert(data.message);

        return;

    }



    fetchEmployees();

}

    return(

        <div className="p-6">


            <h1 className="text-2xl font-bold mb-6">
                Employee Management
            </h1>



            <a
            href="/admin/employees/add"
            className="bg-blue-600 text-white px-4 py-2 inline-block mb-6"
            >
                Add Employee
            </a>





            <table className="w-full border">


                <thead>

                    <tr>


                        <th className="border p-2">
                            Name
                        </th>


                        <th className="border p-2">
                            Email
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


                        <th className="border p-2">
                            Salary
                        </th>


                        <th className="border p-2">
                            Actions
                        </th>


                    </tr>

                </thead>




                <tbody>


                {
                    employees.map((employee)=>(


                        <tr key={employee.id}>


                            <td className="border p-2">
                                {employee.user.name}
                            </td>


                            <td className="border p-2">
                                {employee.user.email}
                            </td>


                            <td className="border p-2">
                               {employee.department?.name ?? "Not Assigned"}
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


                            <td className="border p-2">
                                {employee.salary}
                            </td>


                            <td className="border p-2">

                                <a

href={`/admin/employees/${employee.id}`}

className="text-blue-600 mr-3"

>
    Edit
</a>


                                <button

onClick={()=>deleteEmployee(employee.id)}

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