import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";


// GET MY ATTENDANCE HISTORY

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



        const attendance = await prisma.attendance.findMany({

            where:{

                employee:{

                    user:{

                        email:session.user.email

                    }

                }

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
                message:"Failed to fetch attendance"
            },
            {
                status:500
            }
        );

    }

}