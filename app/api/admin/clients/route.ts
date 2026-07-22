import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET ALL CLIENTS
export async function GET() {

  try {

    const clients = await prisma.client.findMany({

      orderBy: {
        createdAt: "desc"
      }

    });

    return NextResponse.json(clients);


  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch clients"
      },
      {
        status: 500
      }
    );

  }

}



// CREATE CLIENT
export async function POST(req: Request) {

  try {

    const body = await req.json();


    // Basic validation
    if (
      !body.name ||
      !body.contact ||
      !body.projectName ||
      !body.description
    ) {

      return NextResponse.json(
        {
          message: "All fields are required"
        },
        {
          status: 400
        }
      );

    }


    const client = await prisma.client.create({

      data: {

        name: body.name,

        contact: body.contact,

        projectName: body.projectName,

        description: body.description

      }

    });


    return NextResponse.json(client, {
      status: 201
    });


  } catch(error) {

    console.log(error);


    return NextResponse.json(
      {
        message:"Client creation failed"
      },
      {
        status:500
      }
    );

  }

}