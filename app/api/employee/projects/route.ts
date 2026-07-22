import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET PROJECTS ASSIGNED TO EMPLOYEE

export async function GET(req: Request) {

    try {


        const employeeId = req.headers.get("employeeId");


        if(!employeeId){

            return NextResponse.json(
                {
                    message:"Employee ID required"
                },
                {
                    status:400
                }
            );

        }



        const projects = await prisma.projectEmployee.findMany({

            where:{

                employeeId

            },


            include:{

                project:true

            }


        });



        return NextResponse.json(projects);



    } catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Failed to fetch projects"
            },
            {
                status:500
            }
        );

    }

}