import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET SINGLE PAYROLL

export async function GET(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){

    try{

        const {id}=await params;


        const payroll =
        await prisma.payroll.findUnique({

            where:{
                id
            },

            include:{
                employee:{
                    include:{
                        user:true,
                        department:true
                    }
                }
            }

        });



        if(!payroll){

            return NextResponse.json(
                {
                    message:"Payroll not found"
                },
                {
                    status:404
                }
            );

        }



        return NextResponse.json(payroll);



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






// UPDATE PAYROLL

export async function PATCH(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){

    try{


        const {id}=await params;


        const body =
        await req.json();



        const {
            billingDate,
            basicSalary,
            bonus,
            deductions
        }=body;



        const netSalary =
        Number(basicSalary)
        +
        Number(bonus || 0)
        -
        Number(deductions || 0);




        const payroll =
        await prisma.payroll.update({

            where:{
                id
            },


            data:{

                billingDate:
                new Date(billingDate),

                basicSalary:
                Number(basicSalary),

                bonus:
                Number(bonus),

                deductions:
                Number(deductions),

                netSalary

            }

        });



        return NextResponse.json(payroll);



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Payroll update failed"
            },
            {
                status:500
            }
        );

    }

}






// DELETE PAYROLL

export async function DELETE(
    req:Request,
    {params}:{params:Promise<{id:string}>}
){

    try{


        const {id}=await params;



        await prisma.payroll.delete({

            where:{
                id
            }

        });



        return NextResponse.json(
            {
                message:"Payroll deleted"
            }
        );



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Payroll deletion failed"
            },
            {
                status:500
            }
        );

    }

}