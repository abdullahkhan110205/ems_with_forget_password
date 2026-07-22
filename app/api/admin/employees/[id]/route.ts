import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


// GET SINGLE EMPLOYEE
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const employee = await prisma.employee.findUnique({
            where: { id },
            include: {
                user: true,
                department: true
            }
        });

        if (!employee) {
            return NextResponse.json(
                { message: "Employee not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(employee);

    } catch (error) {
        console.error("GET EMPLOYEE ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch employee" },
            { status: 500 }
        );
    }
}


export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const {
            name,
            departmentId,
            position,
            joinedAt,
            salary
        } = body;

        const employee = await prisma.employee.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!employee) {
            return NextResponse.json(
                { message: "Employee not found" },
                { status: 404 }
            );
        }

        if (name) {
            await prisma.user.update({
                where: { id: employee.userId },
                data: { name }
            });
        }

        const updated = await prisma.employee.update({
            where: { id },
            data: {
                departmentId: departmentId ?? employee.departmentId,
                position: position ?? employee.position,
                joinedAt: joinedAt ? new Date(joinedAt) : employee.joinedAt,
                salary: salary != null ? Number(salary) : employee.salary
            },
            include: {
                user: true,
                department: true
            }
        });

        return NextResponse.json(updated);

    } catch (error) {
        console.error("UPDATE EMPLOYEE ERROR:", error);
        return NextResponse.json(
            { message: "Failed to update employee" },
            { status: 500 }
        );
    }
}