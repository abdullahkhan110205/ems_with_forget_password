import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(){

    try{


        const totalPayroll =
        await prisma.payroll.aggregate({

            _sum:{
                netSalary:true
            }

        });





        const employeesPaid =
        await prisma.payroll.count();





        const averageSalary =
        await prisma.payroll.aggregate({

            _avg:{
                netSalary:true
            }

        });






        return NextResponse.json({

            totalPayroll:
            totalPayroll._sum.netSalary || 0,


            employeesPaid,


            averageSalary:
            Math.round(
                averageSalary._avg.netSalary || 0
            )


        });






    }catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Failed to load payroll stats"
            },
            {
                status:500
            }
        );


    }


}