import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";


export async function POST(){

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






        const startOfDay = new Date();

        startOfDay.setHours(
            0,
            0,
            0,
            0
        );



        const endOfDay = new Date();

        endOfDay.setHours(
            23,
            59,
            59,
            999
        );






        const attendance =
        await prisma.attendance.findFirst({

            where:{

                employeeId:employee.id,

                date:{
                    gte:startOfDay,
                    lt:endOfDay
                },

                checkOut:null

            }

        });






        if(!attendance){

            return NextResponse.json(
                {
                    message:"No active check-in found"
                },
                {
                    status:400
                }
            );

        }







        const updatedAttendance =
        await prisma.attendance.update({

            where:{
                id:attendance.id
            },

            data:{

                checkOut:new Date()

            }

        });






        return NextResponse.json(
            updatedAttendance
        );






    }catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Check out failed"
            },
            {
                status:500
            }
        );


    }

}