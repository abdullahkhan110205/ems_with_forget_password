import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
){

    try {


        const { id } = await params;


        const body = await req.json();



        const leave = await prisma.leave.update({

            where:{
                id: id
            },


            data:{
                status: body.status
            }


        });



        return NextResponse.json(leave);



    } catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Leave update failed"
            },
            {
                status:500
            }
        );


    }

}