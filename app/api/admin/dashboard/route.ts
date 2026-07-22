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





        const totalEmployees =
        await prisma.employee.count();




        const totalDepartments =
        await prisma.department.count();






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








        const presentToday =
        await prisma.attendance.count({

            where:{

                date:{

                    gte:startOfDay,

                    lt:endOfDay

                }

            }

        });







        const pendingLeaves =
        await prisma.leave.count({

            where:{

                status:"PENDING"

            }

        });







        const approvedLeaves =
        await prisma.leave.count({

            where:{

                status:"APPROVED"

            }

        });







        const rejectedLeaves =
        await prisma.leave.count({

            where:{

                status:"REJECTED"

            }

        });







        const payrollTotal =
        await prisma.payroll.aggregate({

            _sum:{

                netSalary:true

            }

        });








        return NextResponse.json({


            totalEmployees,


            totalDepartments,


            presentToday,


            pendingLeaves,


            approvedLeaves,


            rejectedLeaves,


            totalPayroll:
            payrollTotal._sum.netSalary || 0



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