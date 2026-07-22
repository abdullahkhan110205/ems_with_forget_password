import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET SINGLE EMPLOYEE

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id:string }> }
) {

  try {

    const {id} = await params;


    const employee =
    await prisma.employee.findUnique({

      where:{
        id
      },

      include:{
        user:true,
        department:true
      }

    });



    if(!employee){

      return NextResponse.json(
        {
          message:"Employee not found"
        },
        {
          status:404
        }
      );

    }


    return NextResponse.json(employee);


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        message:"Failed to fetch employee"
      },
      {
        status:500
      }
    );

  }

}





// UPDATE EMPLOYEE

export async function PATCH(
  req:Request,
  {params}:{params:Promise<{id:string}>}
){

  try{


    const {id}=await params;


    const body=await req.json();


    const {
      name,
      departmentId,
      position,
      salary,
      joinedAt
    }=body;



    const employee =
    await prisma.employee.update({

      where:{
        id
      },

data:{

    position,

    salary:Number(salary),

    joinedAt:
    joinedAt
    ? new Date(joinedAt)
    : undefined,


    department:{

        connect:{
            id:departmentId
        }

    },


    ...(name && {

        user:{

            update:{
                name
            }

        }

    })

},


      include:{

        user:true,

        department:true

      }


    });



    return NextResponse.json(employee);



  }catch(error){


    console.log(error);


    return NextResponse.json(
      {
        message:"Employee update failed"
      },
      {
        status:500
      }
    );


  }

}






// DELETE EMPLOYEE

export async function DELETE(
  req:Request,
  {params}:{params:Promise<{id:string}>}
){

  try{


    const {id}=await params;



    const employee =
    await prisma.employee.findUnique({

      where:{
        id
      }

    });



    if(!employee){

      return NextResponse.json(
        {
          message:"Employee not found"
        },
        {
          status:404
        }
      );

    }




    await prisma.employee.delete({

      where:{
        id
      }

    });



    return NextResponse.json(
      {
        message:"Employee deleted successfully"
      }
    );



  }catch(error){


    console.log(error);


    return NextResponse.json(
      {
        message:"Employee deletion failed"
      },
      {
        status:500
      }
    );


  }

}