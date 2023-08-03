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

const initialRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
const initialDiets = JSON.parse(localStorage.getItem("diets")) || [];

const Home = () => {
    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.allDiets);
    console.log("DIETS", allDiets);
    console.log("RECIPES", allRecipes);
    const [orden, setOrden] = useState("");
    const [loading, setLoading] = useState(true);

    const [recipes, setAllRecipes] = useState(initialRecipes);
    const [diets, setAllDiets] = useState(initialDiets);

    useEffect(() => {
        // Intentamos obtener las recetas guardadas en el local storage
        const savedRecipes = JSON.parse(localStorage.getItem("recipes"));

        // Si hay recetas guardadas en el local storage, las establecemos en el estado
        if (savedRecipes && savedRecipes.length > 0) {
            setAllRecipes(savedRecipes);
            setLoading(false); // Cambiamos el estado de carga a falso
        } else {
            // Si no hay recetas guardadas en el local storage, las obtenemos de la API
            dispatch(getRecipes())
                .then((data) => {
                    setAllRecipes(data); // Establecemos las recetas en el estado
                    localStorage.setItem("recipes", JSON.stringify(data)); // Guardamos las recetas en el local storage
                    setLoading(false); // Cambiamos el estado de carga a falso
                })
                .catch((error) => {
                    console.error("Error fetching recipes:", error);
                    setLoading(false); // En caso de error, también cambiamos el estado de carga a falso
                });
        }

        // Intentamos obtener las dietas guardadas en el local storage
        const savedDiets = JSON.parse(localStorage.getItem("diets"));

        // Si hay dietas guardadas en el local storage, las establecemos en el estado
        if (savedDiets && savedDiets.length > 0) {
            setAllDiets(savedDiets);
        } else {
            // Si no hay dietas guardadas en el local storage, las obtenemos de la API
            dispatch(getDiets())
                .then((data) => {
                    setAllDiets(data); // Establecemos las dietas en el estado
                    localStorage.setItem("diets", JSON.stringify(data)); // Guardamos las dietas en el local storage
                })
                .catch((error) => {
                    console.error("Error fetching diets:", error);
                });
        }
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
