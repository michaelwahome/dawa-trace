import Link from "next/link";

const Page = () => {
    return (
        <form action={""} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Product</h2>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">
                    Product ID
                </label>
                <input
                type="text"
                id="productId"
                name="productId"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's Product ID"
                />
                {/* <div>
                    {state.errors?.firstName &&
                    state.errors.firstName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="batchId" className="block text-gray-700 text-sm font-bold mb-2">
                    Batch ID
                </label>
                <input
                type="text"
                id="batchId"
                name="batchId"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's Batch ID"
                />
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name of Pharmaceutical
                </label>
                <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's name"
                />
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                hidden
                />
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="manufacturingDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Manufacturing Date
                </label>
                <input
                type="date"
                id="manufacturingDate"
                name="manufacturingDate"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                />
                {/* <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="expirationDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Expiration Date
                </label>
                <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                />
                {/* <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <button className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 
            focus:outline-none focus:ring focus:border-green-300 aria-disabled:cursor-not-allowed
            aria-disabled:opacity-50" type="submit">
                Submit
            </button>
        </form>
    )
}

export default Page;