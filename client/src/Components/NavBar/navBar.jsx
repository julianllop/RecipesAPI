import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "./navBar.module.css";
import SearchBar from "../../Views/Search/search";

const NavBar = () => {
    const location = useLocation();

    return (
        <div id="NavBar" className={style.navBar}>
            <div className={style.links}>
                <NavLink
                    to="/create"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    New Recipe
                </NavLink>

                <NavLink
                    to="/home"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none",
                    })}
                >
                    Home
                </NavLink>
                {/* <NavLink
                    to="/about"
                    style={(isActive) => ({
                        color: isActive ? "#d13017" : "#8e1300",

                        "font-size": isActive ? "x-large" : "large",
                        "text-decoration": isActive ? "underline" : "none"
                    })}
                >
                    About
                </NavLink> */}
            </div>
            {location.pathname === "/home" && <SearchBar />}
        </div>
    );
};

export default NavBar;
