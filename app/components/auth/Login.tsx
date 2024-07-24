"use client"
import { useState } from "react"
import Logo from "@/app/atomic/atoms/Logo"
import { useRouter } from "next/navigation"
import useToggleStore from "@/zustand/useToggle"
import useAuthStore from "@/zustand/useAuthStore"
import ButtonComponent from "@/app/atomic/atoms/Button"
import IconInput from "@/app/atomic/molecules/IconInput"
import { inputVariant, buttonVariants } from "@/app/variants/variants"

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })
    const { loginUser, error, isError, loading } = useAuthStore();
    const { toggleForm } = useToggleStore()
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        await loginUser(formValues.email, formValues.password);
    };

    return (
        <main className="flex items-center flex-col justify-center h-[100dvh]" >
            <Logo />
            <section className="sm:w-[476px] w-[100%] mt-[30px] rounded-[12px] sm:p-[40px] p-[10px] sm:bg-white bg-transparent mx-auto h-fit">
                <header className="sm:mb-[40px] mb-[20px]">
                    <h3 className="sm:text-[32px] text-[25px] font-bold text-dark_grey sm:mb-[8px] mb-[5px]">Login</h3>
                    <p className="sm:text-[16px] text-[14px] text-grey">Add your details below to get back into the app</p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-[24px]">
                    <IconInput
                        icon={{
                            src: "mail",
                            alt: "mail"
                        }}
                        input={{
                            errorMsg: error,
                            isError: isError,
                            type: "text",
                            name: "email",
                            className: "px-[30px]",
                            onChange: handleChange,
                            value: formValues.email,
                            variant: inputVariant.DEFAULT,
                            placeholder: "e.g alex@email.com",
                        }}
                        label="Email"
                    />
                    <IconInput
                        icon={{
                            src: "lock",
                            alt: "lock",
                            className: "top-[10px]"
                        }}
                        input={{
                            errorMsg: error,
                            isError: isError,
                            type: "password",
                            className: "",
                            name: "password",
                            onChange: handleChange,
                            value: formValues.password,
                            variant: inputVariant.DEFAULT,
                            placeholder: "Enter your password",
                        }}
                        label="Password"
                    />
                    {/* {error} */}
                    <ButtonComponent type="submit" variant={buttonVariants.FILLED_FULL}>
                        {loading ? 'Logging in...' : 'Login'}
                    </ButtonComponent>
                </form>
                <p className="text-grey mt-[24px] text-center">Don&apos;t have an account? <span onClick={toggleForm} className="text-blue100 cursor-pointer">Create account</span></p>
            </section>
        </main>
    )
}

export default Login
