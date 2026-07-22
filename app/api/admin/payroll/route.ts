import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";



export async function POST(req: Request) {

    try {


        const body = await req.json();



        if(!body.employeeId || !body.basicSalary){

            return NextResponse.json(

                {
                    message:"Employee and salary are required"
                },

                {
                    status:400
                }

            );

        }





        const salary = Number(body.basicSalary);

        const bonus = Number(body.bonus || 0);

        const deductions = Number(body.deductions || 0);



        const netSalary =
        salary + bonus - deductions;





        const payroll =
        await prisma.payroll.create({

            data:{


                employeeId:body.employeeId,


                billingDate:new Date(),


                basicSalary:salary,


                bonus:bonus,


                deductions:deductions,


                netSalary:netSalary


            }

        });




        return NextResponse.json(payroll);



    } catch(error){


        console.log(error);



        return NextResponse.json(

            {
                message:"Payroll generation failed"
            },

            {
                status:500
            }

        );


    }

}