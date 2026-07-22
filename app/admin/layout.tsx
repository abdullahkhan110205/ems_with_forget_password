import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";


export default function AdminLayout({

    children,

}: {

    children: React.ReactNode;

}) {


    return (

        <div className="min-h-screen flex bg-gray-800">


            {/* Sidebar */}

            <aside className="w-64 bg-white shadow-lg p-5">


                <h1 className="text-2xl font-bold text-blue-600 mb-8">

                    EMS Admin

                </h1>





                <nav className="space-y-3">


                    <Link

                    href="/admin/dashboard"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        🏠 Dashboard

                    </Link>



                    <Link

                    href="/admin/departments"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        🏢 Departments

                    </Link>



                    <Link

                    href="/admin/employees"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        👥 Employees

                    </Link>





                    <Link

                    href="/admin/attendance"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📅 Attendance

                    </Link>





                    <Link

                    href="/admin/leaves"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📋 Leaves

                    </Link>





                    <Link

                    href="/admin/payroll"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        💰 Payroll

                    </Link>



                    {/* NEW: CLIENTS MODULE */}

                    <Link

                    href="/admin/clients"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        🤝 Clients

                    </Link>



                    {/* NEW: PROJECTS MODULE */}

                    <Link

                    href="/admin/projects"

                    className="text-gray-900 block p-3 rounded hover:bg-gray-400"

                    >

                        📂 Projects

                    </Link>



                </nav>





                <LogoutButton />



            </aside>







            {/* Page Content */}

            <main className="flex-1 p-6">


                {children}


            </main>




        </div>

    );

}