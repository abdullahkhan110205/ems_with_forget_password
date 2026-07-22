import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(){

    try{


        const totalEmployees =
        await prisma.employee.count();



        const totalDepartments =
        await prisma.department.count();




        const recentEmployees =
        await prisma.employee.findMany({

            take:5,

            orderBy:{
                joinedAt:"desc"
            },


            include:{

                user:true,

                department:true

            }

        });




        return NextResponse.json({

            totalEmployees,

            totalDepartments,

            recentEmployees

        });



    }catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Dashboard data failed"
            },
            {
                status:500
            }
        );


    }

}