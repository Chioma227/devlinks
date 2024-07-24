"use client"
import Login from "@/app/components/auth/Login"
import SignIn from "@/app/components/auth/Signup"
import useToggleStore from "@/zustand/useToggle"

const Auth = () => {
    const { isSignup } = useToggleStore()
    return (
        <>
            {isSignup ? <SignIn /> : <Login />}
        </>
    )
}

export default Auth
