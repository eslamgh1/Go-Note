import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdLockPerson } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { authContext } from '../../context/AuthContext';
import { set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from 'sweetalert2';


export default function Login() {

  const { loginUserFn , token , setToken , } = useContext(authContext)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const schema = z.object({

    email: z.string().email("Email must be Valid"),
    password: z.string().regex(/^[a-zA-Z0-9]{6,}$/, "Password must be at least 6 letters or numbers"),

  })

  const { register, handleSubmit, formState: { errors ,isValid} } = useForm({ mode: "all", resolver: zodResolver(schema) })

  const loginUser = async (values) => {
    setIsLoading(true)
    try {
      const { data } = await loginUserFn(values)
      console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "login successful",
        showConfirmButton: false,
        timer: 1500
      });
      setIsLoading(false)
      setTimeout(() => {
        navigate("../Home")
      }, 1500);

    } catch (errors) {
      console.log(errors)
      setIsLoading(false)
    }
  }


    return (
        <>
            <section className="flex items-center justify-center min-h-screen p-5 md:p-0">
                <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center dark:bg-gray-700">
                            <span className="text-white text-3xl font-bold dark:text-gray-200">
                                <GiNotebook />
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-center dark:text-white">Welcome back</h2>
                    <p className="text-gray-500 text-center text-sm mt-1 mb-6 dark:text-gray-400">
                        Sign in to access your notes.
                    </p>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <span className="mr-2 text-gray-500 dark:text-gray-400">
                                    <HiOutlineMail />
                                </span>
                                <input {...register("email")}  type="email" className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                    placeholder="info@pixsellz.io" />
                            </div>
                            {errors.email && <div className='text-red-500 m-2'> {errors.email.message}</div>}

                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <span className="mr-2 text-gray-500 dark:text-gray-400">
                                    <MdLockPerson />
                                </span>
                                <input {...register("password")}  type="password" className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                    placeholder="Enter your password" />
                            </div>
                            {errors.password && <div className='text-red-500 m-2'> {errors.password.message}</div>}
                        </div>
                        <button type='submit' disabled={!isValid} className="w-full disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-500 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 
                        dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            {isLoading ? <div className='w-6 h-6 border-b-2 rounded-full animate-spin mx-auto'></div> : " Sign in →"} 
                        
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
                        Don’t have an account yet? <Link to={"/register"} className="text-gray-800 font-semibold cursor-pointer dark:text-gray-200 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </section>
        </>
    )
}
