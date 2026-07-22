import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";


// GET ALL EMPLOYEES
export async function GET() {
    try {

        const employees = await prisma.employee.findMany({
            include: {
                user: true,
                department: true
            },
            orderBy: {
                joinedAt: "desc"
            }
        });

        return NextResponse.json(employees);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Failed to fetch employees"
            },
            {
                status: 500
            }
        );
    }
}



// CREATE EMPLOYEE
export async function POST(req: Request) {

    try {

        const body = await req.json();


        const {
            name,
            email,
            password,
            departmentId,
            position,
            joinedAt,
            salary
        } = body;



        // Validate required fields

        if (
            !name ||
            !email ||
            !password ||
            !departmentId ||
            !position ||
            !joinedAt ||
            !salary
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



        // Check department exists

        const department = await prisma.department.findUnique({

            where: {
                id: departmentId
            }

        });


        if (!department) {

            return NextResponse.json(
                {
                    message: "Department not found"
                },
                {
                    status: 400
                }
            );

        }



        // Check duplicate email

        const existingUser = await prisma.user.findUnique({

            where: {
                email
            }

        });


        if (existingUser) {

            return NextResponse.json(
                {
                    message: "Email already exists"
                },
                {
                    status: 400
                }
            );

        }



        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);



        // Create User

        const user = await prisma.user.create({

            data: {

                name,

                email,

                password: hashedPassword,

                role: "EMPLOYEE"

            }

        });



        // Create Employee

        const employee = await prisma.employee.create({

            data: {

                userId: user.id,

                departmentId: departmentId,

                position,

                joinedAt: new Date(joinedAt),

                salary: Number(salary)

            },

            include: {

                user: true,

                department: true

            }

        });



        return NextResponse.json(
            employee,
            {
                status: 201
            }
        );



    } catch (error) {

        console.error("CREATE EMPLOYEE ERROR:", error);


        return NextResponse.json(
            {
                message: "Failed to create employee"
            },
            {
                status: 500
            }
        );

    }

}