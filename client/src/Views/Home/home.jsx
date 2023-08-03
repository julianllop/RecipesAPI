import React, { useState, useEffect } from "react";
import CardsContainer from "../../Components/CardContainer/cardsContainer";
import Paginate from "../../Components/Pagination/Pagination";
import {
    getRecipes,
    getDiets,
    orderByName,
    orderByScore,
    filterByCreator,
    filterByDiet,
} from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import LoadingCards from "../../Components/CardContainer/loadingCards";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.allDiets);
    console.log("DIETS", allDiets);
    console.log("RECIPES", allRecipes);
    const [orden, setOrden] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getRecipes())
            .then(() => setLoading(false)) // Cuando la función getRecipes() se resuelve, se establece el estado de carga en falso
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setLoading(false); // En caso de error, también se establece el estado de carga en falso
            });

        dispatch(getDiets());
    }, [dispatch]);

    //////////////// PAGINADO 1-15
    const [currentPage, setCurrentPage] = useState(1);
    const currentRecipes =
        allRecipes &&
        allRecipes.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);

    //CARGAR TODO*************************************************
    function loadRecipes() {
        dispatch(getRecipes());
    }

    // Ordenados ******************************************
    function handleSortByName(event) {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`);
    }

    function handleSortByScore(e) {
        console.log(e.target.value);
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    //filtros ********************************************
    function handleFilterByDiet(e) {
        dispatch(filterByDiet(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterByCreator(e) {
        dispatch(filterByCreator(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={style.container}>
            <div className={style.ordersAndFilters}>
                <div className={style.orderContainer}>
                    <button onClick={loadRecipes} className={style.button}>
                        All Recipes
                    </button>

                    <select
                        onChange={(e) => handleSortByScore(e)}
                        className={style.botons}
                    >
                        <option value="" default>
                            Healthscore:
                        </option>
                        <option value="asc_score" className={style.option}>
                            Score (Lower-Higher)
                        </option>
                        <option value="desc_score" className={style.option}>
                            Score (Higher-Lower)
                        </option>
                    </select>

                    <select
                        onChange={(event) => handleSortByName(event)}
                        className={style.botons}
                    >
                        <option value="" default>
                            Name:
                        </option>
                        <option value="asc_name" className={style.option}>
                            Alphabetically (A-Z)
                        </option>
                        <option value="desc_name" className={style.option}>
                            Alphabetically (Z-A)
                        </option>
                    </select>

                    <select
                        onChange={(event) => handleFilterByCreator(event)}
                        className={style.botons}
                    >
                        <option value="All" default>
                            All Creators:
                        </option>
                        <option value="Api">Api</option>
                        <option value="DB">Data Base</option>
                    </select>

                    <select
                        onChange={(event) => handleFilterByDiet(event)}
                        className={style.botons}
                    >
                        <option value="All">All Diets:</option>
                        {allDiets &&
                            allDiets.map((diet, i) => (
                                <option value={diet.name} key={i}>
                                    {diet}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className={style.pages}>
                {loading ? (
                    <LoadingCards />
                ) : (
                    <CardsContainer recipes={currentRecipes} />
                )}
            </div>
            <Paginate
                currentPage={currentPage}
                allRecipes={allRecipes ? allRecipes.length : 0}
                paginate={setCurrentPage}
            />
        </div>
    );
};
export default Home;
