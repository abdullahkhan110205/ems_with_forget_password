import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";


// GET MY LEAVE REQUESTS

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



        const leaves = await prisma.leave.findMany({

            where:{

                employee:{

                    user:{

                        email:session.user.email

                    }

                }

            },


            orderBy:{

                createdAt:"desc"

            }

        });



        return NextResponse.json(leaves);



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Failed to fetch leaves"
            },
            {
                status:500
            }
        );

    }

}





// CREATE LEAVE REQUEST

export async function POST(req:Request){

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




        const employee = await prisma.employee.findFirst({

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




        const body = await req.json();


        const leave = await prisma.leave.create({

            data:{

                employeeId:employee.id,

                reason:body.reason,

                startDate:new Date(body.startDate),

                endDate:new Date(body.endDate)

            }

        });




        return NextResponse.json(leave);



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Leave request failed"
            },
            {
                status:500
            }
        );

    }

}