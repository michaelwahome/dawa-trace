import Link from "next/link";
import RegisterCompanyForm from "@/components/auth/registercompany";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-auto items-center bg-gray-100 py-5">
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-9">
            <div className="bg-green-800 p-4 mb-3">
                <Link href="/" className='text-white font-bold text-xl'>
                PharmaTrace
                </Link>
            </div>

            <RegisterCompanyForm />
            
        </div>
    </div>
  );
};

export default Page;