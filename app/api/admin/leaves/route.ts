import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET ALL LEAVES

export async function GET(){

    try{


        const leaves = await prisma.leave.findMany({

            include:{

                employee:{

                    include:{

                        user:true,

                        department:true

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