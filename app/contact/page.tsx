import CollapsibleNavbar from "@/components/home-collapsible-navbar";
import Navbar from "@/components/home-navbar";

const Page = () => {
    return (
        <>
            <CollapsibleNavbar />
            <Navbar />
            <div className="flex justify-around">
                <form className="w-full p-8 md:w-1/2 flex flex-col gap-5 shadow-md shadow-green-800">
                    <h1 className="text-2xl font-bold text-center">Contact Us</h1>
                    <div className="flex flex-col gap-3">
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        placeholder="John Doe"
                        className="rounded-2xl border p-3 focus:outline-green-600"
                    />
                    </div>

                    <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="name@domain.com"
                        className="rounded-2xl border p-3 focus:outline-green-600"
                    />
                    </div>

                    <div className="flex flex-col gap-3">
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                        id="message"
                        placeholder="Type your message here..."
                        className="rounded-2xl border p-3 h-32 focus:outline-green-600"
                    ></textarea>
                    </div>

                    <button className="bg-green-800 rounded-2xl p-3 text-white font-bold hover:bg-green-600" type="submit">
                    Send Message
                    </button>
                </form>
            </div>
        </>
    )
}

export default Page;