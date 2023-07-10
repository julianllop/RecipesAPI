import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

const Landing = () => {
    return (
        <div className={style.landing}>
            <div className={style.container}>
                <div className={style.bienvenido}>
                    <h1>Welcome to my Food App !</h1>
                </div>

                <Link to="/home">
                    <button className={style.boton}>Let's Begin</button>
                </Link>
            </div>
        </div>
    );
};
export default Landing;
