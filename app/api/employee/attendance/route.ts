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





        const attendance =
        await prisma.attendance.findMany({

            where:{

                employeeId:employee.id

            },


            orderBy:{

                date:"desc"

            }

        });





        return NextResponse.json(attendance);



    }catch(error){


        console.log(error);


        return NextResponse.json(

            {
                message:"Failed to load attendance"
            },

            {
                status:500
            }

        );

    }

}