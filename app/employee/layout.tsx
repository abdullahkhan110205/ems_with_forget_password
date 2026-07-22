import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";


export default function EmployeeLayout({

    children,

}: {

    children: React.ReactNode;

}) {


    return (

        <div className="min-h-screen flex bg-gray-100">



            {/* Sidebar */}

            <aside className="w-64 bg-white shadow-lg p-5">


                <h1 className="text-2xl font-bold text-green-600 mb-8">

                    EMS Employee

                </h1>





                <nav className="space-y-3">



                    <Link

                    href="/employee/dashboard"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        🏠 Dashboard

                    </Link>






                    <Link

                    href="/employee/profile"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        👤 My Profile

                    </Link>






                    <Link

                    href="/employee/attendance"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📅 Attendance

                    </Link>






                    <Link

                    href="/employee/leaves"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📋 Leaves

                    </Link>






                    <Link

                    href="/employee/projects"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📂 My Projects

                    </Link>






                    <Link

                    href="/employee/payroll"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        💰 Payroll

                    </Link>




                </nav>








                <LogoutButton />



            </aside>









            {/* Content */}

            <main className="flex-1 p-6">


                {children}


            </main>





        </div>

    );

}