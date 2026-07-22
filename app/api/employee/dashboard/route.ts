import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";


// GET EMPLOYEE DASHBOARD DATA

export async function GET(){

    try{


        const session = await auth();


        console.log("SESSION:", session);



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


                department:true,



                payrolls:{


                    orderBy:{


                        billingDate:"desc"


                    }


                },



                attendance:true,



                leaves:true


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



            id: employee.id,


            name: employee.user.name,


            email: employee.user.email,



            department: employee.department?.name ?? "Not Assigned",



            position: employee.position,



            joinedAt: employee.joinedAt,



            salary: employee.salary,



            payrolls: employee.payrolls,



            attendanceDays:
            employee.attendance.length,



            leavesTaken:
            employee.leaves.filter(
                (leave)=>
                leave.status === "APPROVED"
            ).length,



            pendingLeaves:
            employee.leaves.filter(
                (leave)=>
                leave.status === "PENDING"
            ).length



        });






    }catch(error){


        console.log(error);



        return NextResponse.json(

            {
                message:"Failed to load dashboard"
            },

            {
                status:500
            }

        );


    }

}