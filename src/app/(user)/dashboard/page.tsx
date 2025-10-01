// src/app/dashboard/page.tsx
import Sidebar from "@/components/components_app/sidebar";
// import NavbarApp from "@/components/components_app/navbar";

// import { EnvVarWarning } from "@/components/env-var-warning";
// import { AuthButton } from "@/components/auth-button";
// import { hasEnvVars } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceChart, DepartmentChart } from "@/components/components_app/charts";
import EmployeeTable from "@/components/components_app/table";
// import Link from "next/link";
export default function DashboardPage() {
  return (
    <div className="max-w-10xl">
        <main className="p-6  space-y-6">
          <div className="flex w-screen ">
            <Sidebar />
            {/* Cards */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl  font-bold">120</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>New Hires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">10</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">20</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">03</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AttendanceChart />
                <DepartmentChart />
              </div>

              {/* Table */}
              <EmployeeTable />
              </div>
        </div>
      </main>
    </div>
  );
}