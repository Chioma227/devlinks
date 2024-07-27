"use client"
import React, { useEffect } from "react";
import Header from "../../molecules/Header";
import Leftpanel from "@/app/components/common/Leftpanel";
import RightPanel from "@/app/components/common/RightPanel";

const Dashboard = () => {
  
    useEffect(() => {
    localStorage.clear()
    });

    return (
        <main className="md:p-[24px] p-0 ">
            <Header />
            <section className=" md:px-0 px-[20px] flex gap-[24px] mt-[24px]">
                <Leftpanel />
                <RightPanel />
            </section>
        </main>
    )
}

export default Dashboard