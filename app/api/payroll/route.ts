import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET ALL PAYROLLS

export async function GET(){

    try{

        const payrolls =
        await prisma.payroll.findMany({

            include:{

                employee:{

                    include:{

                        user:true,

                        department:true

                    }

                }

            },

            orderBy:{

                billingDate:"desc"

            }

        });



        return NextResponse.json(payrolls);


    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Failed to fetch payroll"
            },
            {
                status:500
            }
        );

    }

}





// CREATE PAYROLL

export async function POST(
    req:Request
){

    try{


        const body =
        await req.json();



        const {

            employeeId,

            billingDate,

            basicSalary,

            bonus,

            deductions

        } = body;




        const netSalary =
        Number(basicSalary)
        +
        Number(bonus || 0)
        -
        Number(deductions || 0);






        const payroll =
        await prisma.payroll.create({

            data:{


                employeeId,


                billingDate:
                billingDate
                ?
                new Date(billingDate)
                :
                new Date(),


                basicSalary:
                Number(basicSalary),


                bonus:
                Number(bonus || 0),


                deductions:
                Number(deductions || 0),



                netSalary


            }

        });



        return NextResponse.json(
            payroll,
            {
                status:201
            }
        );



    }catch(error){


        console.log(error);



        return NextResponse.json(
            {
                message:"Payroll creation failed"
            },
            {
                status:500
            }
        );


    }

}