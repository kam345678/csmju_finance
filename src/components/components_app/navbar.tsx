// import { DeployButton } from "@/components/deploy-button";

import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
// import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function NavbarApp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
            </div>
             <input
                type="text"
                placeholder="Search..."
                className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>
      </div>
  );
}

{/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-30">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"}>Next.js Supabase Starter</Link>
          </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
        </nav> */}
