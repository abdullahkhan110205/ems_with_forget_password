import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// UPDATE DEPARTMENT
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const body = await req.json();

    const department = await prisma.department.update({

      where:{
        id
      },

      data:{
        name: body.name
      }

    });


    return NextResponse.json(department);


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        message:"Department update failed"
      },
      {
        status:500
      }
    );

  }

}



// DELETE DEPARTMENT
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
){

  try {

    const { id } = await params;



    // Check employees inside department

    const employeeCount =
      await prisma.employee.count({

        where:{
          departmentId:id
        }

      });



    if(employeeCount > 0){

      return NextResponse.json(
        {
          message:
          "Cannot delete department because employees exist"
        },
        {
          status:400
        }
      );

    }



    await prisma.department.delete({

      where:{
        id
      }

    });



    return NextResponse.json(
      {
        message:"Department deleted successfully"
      }
    );


  } catch(error){

    console.log(error);


    return NextResponse.json(
      {
        message:"Department deletion failed"
      },
      {
        status:500
      }
    );

  }

}