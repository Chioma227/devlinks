"use client"
import { useState } from "react"
import Logo from "@/app/atomic/atoms/Logo"
import { useRouter } from "next/navigation"
import useToggleStore from "@/zustand/useToggle"
import useAuthStore from "@/zustand/useAuthStore"
import ButtonComponent from "@/app/atomic/atoms/Button"
import IconInput from "@/app/atomic/molecules/IconInput"
import { inputVariant, buttonVariants } from "@/app/variants/variants"


const SignIn = () => {

    //states
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { createUser, error, isError, loading } = useAuthStore();
    const { toggleForm } = useToggleStore()
    const router = useRouter()

    //handle change function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    //handle submit function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formValues;

        //create user
        await createUser(email, password, confirmPassword);
        // router.push('/overview')

    };

    return (
        <main className="flex items-center flex-col justify-center h-[100dvh]" >
            <>
                <Logo />
                <section className="sm:w-[476px] w-[100%] mt-[30px] rounded-[12px] sm:p-[40px] p-[10px] sm:bg-white bg-transparent mx-auto h-fit">
                    <header className="sm:mb-[40px] mb-[20px]">
                        <h3 className="sm:text-[32px] text-[25px] font-bold text-dark_grey sm:mb-[8px] mb-[5px]">Create account</h3>
                        <p className="sm:text-[16px] text-[14px] text-grey">Let&apos;s get you started sharing your links</p>
                    </header>
                    <form onSubmit={handleSubmit} className="sm:space-y-[24px] space-y-[15px]">
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
                                className: "bg-transparent",
                                onChange: handleChange,
                                value: formValues.email,
                                variant: inputVariant.DEFAULT,
                                placeholder: "e.g alex@email.com",
                            }}
                            label="Email address"
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
                                placeholder: "Atleast 8 characters",
                            }}
                            label="Create password"
                        />
                        <IconInput
                            icon={{
                                src: "lock",
                                alt: "lock",
                                className: "top-[10px]"
                            }}
                            input={{
                                type: "password",
                                className: "",
                                name: "confirmPassword",
                                onChange: handleChange,
                                value: formValues.confirmPassword,
                                variant: inputVariant.DEFAULT,
                                placeholder: "Atleast 8 characters",
                            }}
                            label="Confirm password"
                        />
                        {error}
                        <ButtonComponent type="submit" variant={buttonVariants.FILLED_FULL}>
                            {loading ? 'Creating account...' : 'Create new account'}
                        </ButtonComponent>
                    </form>
                    <p className="text-grey mt-[24px] text-center">Already have an account? <span onClick={toggleForm} className="text-blue100 cursor-pointer">Login</span></p>
                </section>
            </>
        </main>
    )
}

export default SignIn
