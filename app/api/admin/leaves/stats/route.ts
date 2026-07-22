import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(){

    try{


        const pending =
        await prisma.leave.count({

            where:{
                status:"PENDING"
            }

        });



        const approved =
        await prisma.leave.count({

            where:{
                status:"APPROVED"
            }

        });



        const rejected =
        await prisma.leave.count({

            where:{
                status:"REJECTED"
            }

        });



        return NextResponse.json({

            pending,

            approved,

            rejected

        });



    }catch(error){


        return NextResponse.json(
            {
                message:"Failed to load leave stats"
            },
            {
                status:500
            }
        );

    }

}