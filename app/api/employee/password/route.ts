import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function PATCH(req:Request){

    try{

        const body = await req.json();


        const {
            currentPassword,
            newPassword
        } = body;



        const employee =
        await prisma.employee.findFirst({

            include:{
                user:true
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



        if(!employee.user.password){

            return NextResponse.json(
                {
                    message:"This account has no password set (signed in via Google)"
                },
                {
                    status:400
                }
            );

        }



        const passwordMatch =
        await bcrypt.compare(
            currentPassword,
            employee.user.password
        );



        if(!passwordMatch){

            return NextResponse.json(
                {
                    message:"Current password is incorrect"
                },
                {
                    status:400
                }
            );

        }




        const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );



        await prisma.user.update({

            where:{
                id:employee.userId
            },


            data:{
                password:hashedPassword
            }

        });



        return NextResponse.json(
            {
                message:"Password updated successfully"
            }
        );



    }catch(error){

        console.log(error);


        return NextResponse.json(
            {
                message:"Password update failed"
            },
            {
                status:500
            }
        );

    }

}