import React from 'react';
import {useAuth} from "@/context/authContext";
import MenuNavSgme from "@/components/menu-site/MenuNavSgme";
import MenuNavSite from "@/components/menu-site/MenuNavSite";
import Footer from "@/components/menu-site/Footer";

function MainContainer({children}) {
    const {user } = useAuth();



    return (
        <div>
            {user  ? (
                <MenuNavSgme/>
            ) : (
                <MenuNavSite />
            )}
            <div className="min-vh-100 mt-5" >{children}</div>

            <Footer/>
        </div>
    );
}

export default MainContainer;