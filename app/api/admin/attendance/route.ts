import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(){

    try{


        const attendance =
        await prisma.attendance.findMany({

            include:{

                employee:{

                    include:{

                        user:true,

                        department:true

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
