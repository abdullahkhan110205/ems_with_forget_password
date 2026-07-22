"use client";

import { useEffect, useState } from "react";


interface Client {

    id: string;

    name: string;

    contact: string;

    projectName: string;

    description: string;

    createdAt: string;

}



export default function ClientsPage(){


    const [clients,setClients] = useState<Client[]>([]);


    const [name,setName] = useState("");

    const [contact,setContact] = useState("");

    const [projectName,setProjectName] = useState("");

    const [description,setDescription] = useState("");




    useEffect(()=>{

        fetchClients();

    },[]);




    async function fetchClients(){


        const res = await fetch(
            "/api/admin/clients"
        );


        const data = await res.json();


        setClients(data);


    }





    async function addClient(){


        const res = await fetch(

            "/api/admin/clients",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    name,

                    contact,

                    projectName,

                    description

                })

            }

        );



        if(res.ok){


            alert("Client added");


            setName("");

            setContact("");

            setProjectName("");

            setDescription("");


            fetchClients();


        }
        else{


            alert("Failed to add client");


        }


    }




return (

<div>


<h1 className="text-2xl font-bold mb-6">

🤝 Clients

</h1>





<div className="bg-white shadow rounded-lg p-6 mb-8">


<h2 className="text-gray-900 text-xl font-semibold mb-4">

Add New Client

</h2>




<input

className="text-gray-900 border p-2 w-full mb-3 rounded"

placeholder="Client Name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>



<input

className="text-gray-900 border p-2 w-full mb-3 rounded"

placeholder="Contact Information"

value={contact}

onChange={
e=>setContact(e.target.value)
}

/>



<input

className="text-gray-900 border p-2 w-full mb-3 rounded"

placeholder="Project Name"

value={projectName}

onChange={
e=>setProjectName(e.target.value)
}

/>




<textarea

className="text-gray-900 border p-2 w-full mb-3 rounded"

placeholder="Project Description"

value={description}

onChange={
e=>setDescription(e.target.value)
}

/>




<button

onClick={addClient}

className="text-gray-900 bg-blue-600 text-white px-5 py-2 rounded"

>

Add Client

</button>



</div>






<div className="text-gray-900 bg-white shadow rounded-lg p-6">


<h2 className="text-xl font-semibold mb-4">

Client List

</h2>




<table className="w-full border">


<thead>


<tr>

<th className="border p-2">
Name
</th>


<th className="border p-2">
Contact
</th>


<th className="border p-2">
Project
</th>


<th className="border p-2">
Description
</th>


</tr>


</thead>




<tbody>


{

clients.map(client=>(


<tr key={client.id}>


<td className="border p-2">

{client.name}

</td>



<td className="border p-2">

{client.contact}

</td>




<td className="border p-2">

{client.projectName}

</td>




<td className="border p-2">

{client.description}

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