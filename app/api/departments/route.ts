import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET ALL DEPARTMENTS

export async function GET(){

    try{

        const departments = await prisma.department.findMany({

            include:{
                _count:{
                    select:{
                        employees:true
                    }
                }
            },

            orderBy:{
                createdAt:"desc"
            }

        });


        return NextResponse.json(departments);


    }catch(error){

        console.log(error);

        return NextResponse.json(
            {
                message:"Failed to fetch departments"
            },
            {
                status:500
            }
        );

    }

}



// CREATE DEPARTMENT

export async function POST(req:Request){

    try{

        const body = await req.json();

        const {name}=body;


        if(!name){

            return NextResponse.json(
                {
                    message:"Department name required"
                },
                {
                    status:400
                }
            );

        }



        const department =
        await prisma.department.create({

            data:{
                name
            }

        });



        return NextResponse.json(
            department,
            {
                status:201
            }
        );



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Department creation failed"
            },
            {
                status:500
            }
        );

    }

}