import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


// GET ALL EMPLOYEES
export async function GET() {

  try {

    const employees = await prisma.employee.findMany({

      include:{
        user:true,
        department:true
      },

      orderBy:{
        joinedAt:"desc"
      }

    });


    return NextResponse.json(employees);


  } catch(error) {

    console.log(error);

    return NextResponse.json(
      {
        message:"Failed to fetch employees"
      },
      {
        status:500
      }
    );

  }

}





// CREATE EMPLOYEE
export async function POST(req:Request) {

  try {

    const body = await req.json();


    const {
      name,
      email,
      password,
      departmentId,
      position,
      salary,
      joinedAt
    } = body;



    if(
      !name ||
      !email ||
      !password ||
      !departmentId ||
      !position ||
      !salary
    ){

      return NextResponse.json(
        {
          message:"All fields are required"
        },
        {
          status:400
        }
      );

    }



    const existingUser =
      await prisma.user.findUnique({

        where:{
          email
        }

      });



    if(existingUser){

      return NextResponse.json(
        {
          message:"Email already exists"
        },
        {
          status:400
        }
      );

    }



    const hashedPassword =
      await bcrypt.hash(password,10);



    const user =
      await prisma.user.create({

        data:{

          name,

          email,

          password:hashedPassword,

          role:"EMPLOYEE"

        }

      });





    const employee =
      await prisma.employee.create({

        data:{

          userId:user.id,

          departmentId,

          position,

          salary:Number(salary),

          joinedAt: joinedAt
          ? new Date(joinedAt)
          : new Date()

        },


        include:{

          user:true,

          department:true

        }

      });



    return NextResponse.json(

      employee,

      {
        status:201
      }

    );



  } catch(error) {


    console.log(error);


    return NextResponse.json(

      {
        message:"Employee creation failed"
      },

      {
        status:500
      }

    );

  }

}