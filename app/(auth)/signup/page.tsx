import SignUpForm from "@/components/auth/signup";
import Link from "next/link";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-auto items-center bg-gray-100 py-5">
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-9">
            <div className="bg-green-800 p-4 mb-3">
                <Link href="/" className='text-white font-bold text-xl'>
                  DawaTrace
                </Link>
            </div>

            <SignUpForm />
        </div>
    </div>
  );
};

export default Page;