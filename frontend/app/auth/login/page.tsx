import Link from "next/link";
import { LoginForm } from "@/Components/Forms";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coursatty | Login",
  description: "Coursatty login page",
};

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-64px)] space-y-4 px-6 lg:px-8 bg-white py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-20 w-auto"
          src="/coursatty_high_resolution_logo_black_transparent.png"
          alt="Coursatty"
          width={400}
          style={{width:"auto"}}
          height={400}
          priority
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        {/* <SocialButtons /> */}

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
