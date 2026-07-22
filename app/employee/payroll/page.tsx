"use client";

import { useEffect, useState } from "react";


export default function EmployeePayrollPage(){


    const [payrolls,setPayrolls] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);





    async function loadPayroll(){


        const res = await fetch(
            "/api/employee/dashboard"
        );


        const data = await res.json();



        setPayrolls(
            data.payrolls || []
        );


        setLoading(false);


    }






    useEffect(()=>{

        loadPayroll();

    },[]);







    if(loading){

        return(

            <div className="text-gray-900 p-6">

                Loading payroll...

            </div>

        );

    }








    return(

        <div className="p-6">



            <h1 className="text-gray-900 text-3xl font-bold mb-6">

                My Payroll History

            </h1>







            <div className="text-gray-900 bg-white shadow rounded-xl p-5">


                <table className="w-full border">



                    <thead>


                        <tr>


                            <th className="border p-3">
                                Date
                            </th>



                            <th className="border p-3">
                                Basic Salary
                            </th>




                            <th className="border p-3">
                                Bonus
                            </th>




                            <th className="border p-3">
                                Deductions
                            </th>




                            <th className="border p-3">
                                Net Salary
                            </th>



                        </tr>


                    </thead>








                    <tbody>


                    {

                    payrolls.length === 0

                    ?

                    (

                        <tr>

                            <td

                            colSpan={5}

                            className="text-center p-5"

                            >

                                No payroll records found

                            </td>

                        </tr>

                    )


                    :


                    payrolls.map((pay)=>(


                        <tr key={pay.id}>


                            <td className="border p-3">


                                {
                                new Date(
                                    pay.billingDate
                                ).toLocaleDateString()
                                }


                            </td>





                            <td className="border p-3">

                                {pay.basicSalary}

                            </td>





                            <td className="border p-3">

                                {pay.bonus}

                            </td>





                            <td className="border p-3">

                                {pay.deductions}

                            </td>





                            <td className="border p-3 font-bold">

                                {pay.netSalary}

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