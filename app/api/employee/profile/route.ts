import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";



// GET EMPLOYEE PROFILE

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

            },


            include:{

                user:true,

                department:true

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






        return NextResponse.json({

            id:employee.id,

            name:employee.user.name,

            email:employee.user.email,

           department:employee.department?.name ?? "Not Assigned",

            position:employee.position,

            joinedAt:employee.joinedAt,

            salary:employee.salary

        });






    }catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Failed to load profile"
            },
            {
                status:500
            }
        );


    }

}








// UPDATE EMPLOYEE PROFILE

export async function PATCH(req:Request){


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





        const body = await req.json();


        const {

            name,

            email

        } = body;







        const updatedUser =

        await prisma.user.update({

            where:{

                email:session.user.email

            },


            data:{


                name,


                email


            }


        });







        return NextResponse.json({

            message:"Profile updated successfully",

            user:updatedUser

        });







    }catch(error){


        console.log(error);


        return NextResponse.json(

            {
                message:"Profile update failed"
            },

            {
                status:500
            }

        );


    }

}