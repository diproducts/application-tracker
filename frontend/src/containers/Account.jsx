import { useState, useEffect } from "react";

export const Account = ({ }) => {
    const [active, setActive] = useState("contact");

    return (
        <div className={`w-full gap-[35px] flex flex-col justify-start items-start pt-[70px] dashboardContainer`}>
            <h1 className="font-noto text-[28px] text-headerBlack font-medium m-0
            pl-[32%]">Account Information</h1>
            <div className="flex pl-[14%]">
                <div className="flex flex-col pt-[44px] font-inter text-black text-[15px] font-normal">
                    <span onClick={() => setActive("contact")}
                        className={`${active === "contact" ? "font-bold bg-paleBlue" : "hover:bg-hoverBlue "} cursor-pointer  px-[8px] py-[7.5px]  rounded-[4px]`}>Contact information</span>
                    <span onClick={() => setActive("resume")} className={`${active === "resume" ? "font-bold bg-paleBlue" : "hover:bg-hoverBlue "} cursor-pointer  px-[8px] py-[7.5px]  rounded-[4px]`}>Default resume</span>
                    <span onClick={() => setActive("pay")} className={`${active === "pay" ? "font-bold bg-paleBlue" : "hover:bg-hoverBlue "} cursor-pointer  px-[8px] py-[7.5px]  rounded-[4px]`}>Payment & Subscriptions</span>
                </div>
                <div>
                    <p></p>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Account;