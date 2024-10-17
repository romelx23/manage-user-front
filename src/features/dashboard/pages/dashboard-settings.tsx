import { useForm } from "react-hook-form";
import { useAuthStore } from "../../auth/store/authStore"
import { DashboardLayout } from "../layouts/DashboardLayout"

interface FormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const DashboardSettings = () => {

  const { user } = useAuthStore();

  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
    // reset,
    // setError
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      repeatPassword: '',
    }
  })

  const switchTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col px-10 py-5 gap-4">
        <h1 className="font-semibold">Dashboard Settings</h1>

        <div className="bg-gray-700 max-w-xl py-7 px-4">
          <form className="max-w-md mx-auto">
            <div className="flex justify-between mb-4">
              <h3>User Configuration</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                {
                ...register('name', {
                  required: 'Name is required'
                })
                }
              />
              <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              {
                errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>
              }
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:cursor-not-allowed" placeholder=" " required
                {
                ...register('email', {
                  required: 'Email is required'
                })
                }
                disabled
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {
                errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>
              }
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                {
                ...register('password', {
                  required: 'Password is required'
                })
                }
              />
              <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {
                errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>
              }
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                {
                ...register('repeatPassword', {
                  required: 'Repeat password is required'
                })
                }
              />
              <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
              {
                errors.repeatPassword && <span className="text-red-500 text-sm">{errors.repeatPassword.message}</span>
              }
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar</button>
          </form>
        </div>

        <div className="bg-gray-700 max-w-xl py-7 px-4">
          <form className="max-w-md mx-auto">
            <div className="flex  justify-between">
              <h3>Theme Configuration</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brush"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label htmlFor="theme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Theme</label>
              <select
                id="theme"
                name="theme"
                onChange={() => {
                  switchTheme((document.getElementById('theme') as HTMLSelectElement).value)

                }}
                className="block w-full py-2.5 px-0 text-sm bg-transparent border-b-2 appearance-none text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 peer">
                <option className="py-2" value="light">Light</option>
                <option className="py-2" value="dark">Dark</option>
                <option className="py-2" value="yellow">Yellow</option>
                <option className="py-2" value="green">Green</option>
                <option className="py-2" value="red">Red</option>
                <option className="py-2" value="purple">Purple</option>
              </select>
            </div>

            {/* <div className="flex relative border border-green-400 w-64 group">
              <div className="flex items-center pl-11 w-full h-full absolute z-10 border border-red-500 text-[#fe6767] gap-3  group-hover:text-green-500">
                <span className="text-lg  font-semibold">
                  Cambio de Tema
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-125"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z" /><path d="M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" /><path d="M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" /><path d="M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" /></svg>
              </div>

              <svg width="303" height="116" viewBox="0 0 320 116" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="stroke-[10px] stroke-[#fe6767]  group-hover:stroke-green-500 cursor-pointer transition-colors duration-300 ease-in-out group-hover:fill-slate-300 fill-red-900"
              >
                <path d="M243.015 1H12.0674C7.11073 1 4.29183 6.66945 7.28351 10.6214L38.0308 51.2382C39.5203 53.2058 39.6531 55.8848 38.3656 57.9901L9.08389 105.87C6.63879 109.868 9.51606 115 14.2025 115H243.015C244.606 115 246.132 114.368 247.257 113.243L298.257 62.2426C300.6 59.8995 300.6 56.1005 298.257 53.7574L247.257 2.75736C246.132 1.63214 244.606 1 243.015 1Z" />
              </svg>
            </div> */}




            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar</button>
          </form>
        </div>
      </div>


    </DashboardLayout>
  )
}
