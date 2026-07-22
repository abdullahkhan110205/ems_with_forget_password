import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET ALL PROJECTS
export async function GET() {

  try {

    const projects = await prisma.project.findMany({

      include: {

        employees: {

          include: {

            employee: {

              include: {

                user: true

              }

            }

          }

        }

      },

      orderBy: {

        createdAt: "desc"

      }

    });


    return NextResponse.json(projects);


  } catch(error) {

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



// CREATE PROJECT
export async function POST(req: Request) {

  try {

    const body = await req.json();


    const {
      name,
      startDate,
      deadline,
      employeeIds
    } = body;


    // validation
    if(
      !name ||
      !startDate ||
      !deadline ||
      !employeeIds ||
      employeeIds.length === 0
    ){

      return NextResponse.json(
        {
          message:"Project name, dates and at least one employee required"
        },
        {
          status:400
        }
      );

    }



    const project = await prisma.project.create({

      data: {

        name,

        startDate: new Date(startDate),

        deadline: new Date(deadline),


        employees: {

          create: employeeIds.map((employeeId:string)=>({

            employeeId

          }))

        }

      },


      include: {

        employees:true

      }

    });



    return NextResponse.json(project, {
      status:201
    });


  } catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Project creation failed"
      },
      {
        status:500
      }
    );

  }

}