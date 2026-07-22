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





        const attendance =
        await prisma.employee.findMany({

            include:{


                user:true,


                department:true,


                attendance:{

                    orderBy:{

                        date:"desc"

                    },

                    take:1

                }


            }


        });







        const result =
        attendance.map((employee)=>(


            {

                id:employee.id,


                name:employee.user.name,


                department: employee.department?.name ?? "Not Assigned",


                attendance:
                employee.attendance[0] || null


            }


        ));







        return NextResponse.json(result);






    }catch(error){


        console.log(error);


        return NextResponse.json(

            {
                message:"Failed to load attendance report"
            },

            {
                status:500
            }

        );


    }


}