import Link from 'next/link';

const Navbar = () => {
    return (
      <nav className="bg-green-800 p-4 flex items-center justify-evenly">
        <Link href="/" className='text-white font-bold text-xl'>
          PharmaTrace
        </Link>
  
        <div className="flex justify-between space-x-4">
          <Link href="/" className='text-white'>
            Home
          </Link>
          <Link href="/about" className='text-white'>
           About Us
          </Link>
          <Link href="/contact" className='text-white'>
            Contact Us
          </Link>
        </div>
  
        <div className="flex items-center space-x-4">
          <Link href="/signin" className='text-white'>
            Sign In
          </Link>
          <Link href="/signup" className="text-white bg-green-600 px-4 py-2 rounded-full">
            Sign Up
          </Link>
        </div>
      </nav>
    );
  };
  
export default Navbar;