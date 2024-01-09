import CollapsibleNavbar from "@/components/home-collapsible-navbar";
import Navbar from "@/components/home-navbar";

const Page = () => {
    return (
        <>
            <CollapsibleNavbar />
            <Navbar />
            <div className="pt-20 px-10 lg:px-32 pb-96 bg-gray-100 h-full">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">Verify your Pharma Products the DawaTrace Way!</h1>
                <p className="text-gray-600 text-lg lg:text-xl">
                    Our "About Us" section proudly represents our platform's goal, which is leveraging the Ethereum blockchain and smart contracts to revolutionize transparency, traceability, and accountability in the pharmaceutical industry.

                    In a world where trust and accountability are paramount, we recognize the inherent potential of decentralised technology to redefine the way we interact with data.

                    As advocates for the widespread adoption of blockchain technology, we are not merely building a platform; we are crafting a paradigm shift. 

                    Cement your name in the new era by being a part of this change. Try DawaTrace today!
                </p>
            </div>
            
        </>
    )
}

export default Page;