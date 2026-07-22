import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";


export async function GET(){

    try{


        const session = await auth();


        if(!session?.user?.email){

            return NextResponse.json(
                {
                    message:"Unauthorized"
                },
                {
                    status:401
                }
            );

        }




        const employee =
        await prisma.employee.findFirst({

            where:{
                user:{
                    email:session.user.email
                }
            }

        });





        if(!employee){

            return NextResponse.json(
                {
                    message:"Employee not found"
                },
                {
                    status:404
                }
            );

        }






        const start = new Date();

        start.setHours(0,0,0,0);



        const attendance =
        await prisma.attendance.findFirst({

            where:{

                employeeId:employee.id,

                date:{
                    gte:start
                }

            }

        });




        return NextResponse.json(
            attendance || null
        );




    }catch(error){


        return NextResponse.json(
            {
                message:"Failed"
            },
            {
                status:500
            }
        );

    }

}