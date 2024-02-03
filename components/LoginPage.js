import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {

    const router = useRouter();
    const [email,setEmail] = useState("");
    const[password , setPassword] = useState("");

    const handleSubmit =  async (e) => {
    
        e.preventDefault();


        try {
            const res = await signIn('credentials',{
                email,
                password,
                redirect: false,
            });

            if(res.error)
            {
                console.log("error signing in");
            }
            if(email === "ssultanbscs22seecs@seecs.edu.pk")
            {
              router.replace("/admin/dashboard");
            }
            else
            {
              router.replace("/home");

            }



            
        } catch (error) {
            console.log(error);
        }
    }




  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
            onChange={e => setEmail(e.target.value)}
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
            onChange={e => setPassword(e.target.value)}
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
          onClick={e => handleSubmit(e)}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">
            Don't have an account?
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;