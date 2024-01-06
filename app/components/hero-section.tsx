import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
      <div className="flex md:flex-row items-center justify-center h-auto bg-gray-100 py-20">
        <div className="max-w-md mx-6">
          <h1 className="text-4xl font-bold mb-4">Verify your Pharma Products the PharmaTrace Way!</h1>
          <p className="text-gray-600 mb-6">
            Trace the history of your pharmaceutical products, from manufacture to retail, right here at PharmaTrace. 
            Click the link below to get started.
          </p>
          <Link href="/signup" className="bg-green-800 text-white py-2 px-4 rounded-full">
            Get Started
          </Link>
        </div>
  
        <div className="flex-shrink-0 hidden md:block ml-6 ">
          <Image
            src="/hero-pharmaceuticals.jpg"
            width={400}
            height={400}
            alt="Image of pharmaceuticals"
          />
        </div>
      </div>
    );
  };
  
  export default HeroSection;