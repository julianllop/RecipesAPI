import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./validaciones";
import { getDiets, createRecipe } from "../../Redux/actions";
import style from "./form.module.css";

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const diets = useSelector((state) => state.diets);
    const recipes = useSelector((state) => state.allRecipes);

    const [errors, setErrors] = useState({
        title: "",
        image: "",
        diet: "",
        summary: "",
        healthScore: "",
        analyzedInstructions: "",
    });

    const hasErrors = Object.values(errors).some((error) => error !== "");

    const [form, setForm] = useState({
        title: "",
        image: "",
        diet: [],
        summary: "",
        healthScore: "",
        analyzedInstructions: "",
    });

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]); //dispatch cuando quiero modificar algo del estado global

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        setErrors(
            validate(
                {
                    ...form,
                    [property]: value,
                },
                recipes
            )
        );

        console.log("errores: ", errors);
    };

    const handleSelectDiet = (event) => {
        const selectedDiet = event.target.value;
        console.log(form.diet);

        if (!form.diet.includes(selectedDiet) && selectedDiet !== "") {
            setForm({
                ...form,
                diet: [...form.diet, selectedDiet],
            });
        }
    };

    const handleDeleteDiet = (index) => {
        setForm((form) => {
            const updatedDiets = [...form.diet];
            updatedDiets.splice(index, 1);
            return { ...form, diet: updatedDiets };
        });
    };

    function handleSubmit() {
        let { title, image, diet, summary, healthScore, analyzedInstructions } =
            form;

        dispatch(
            createRecipe({
                title,
                image,
                diet,
                summary,
                healthScore,
                analyzedInstructions,
            })
        );

        setForm({
            title: "",
            image: "",
            diet: [],
            summary: "",
            healthScore: "",
            analyzedInstructions: "",
        });

        console.log(form.analyzedInstructions);

        history.push("/home");
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.inForm}>
                    <h2 className={style.title}>CREATE NEW RECIPE:</h2>
                    <div className={style.inputCont}>
                        {/* <label>Name: </label> */}
                        <h4 className={style.label}>Title:</h4>

                        <input
                            className={style.input}
                            placeholder="Insert title: "
                            required
                            type="text"
                            value={form.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div className={style.inputCont}>
                        {/* <label>Summary: </label> */}
                        <h4 className={style.label}>Summary:</h4>

                        <input
                            className={style.input}
                            placeholder="Insert summary: "
                            required
                            type="text"
                            value={form.summary}
                            onChange={handleInputChange}
                            name="summary"
                        />
                        {errors.summary && <p>{errors.summary}</p>}
                    </div>

                    <div className={style.inputCont}>
                        {/* <label>Health score: </label> */}
                        <h4 className={style.label}>Health score:</h4>

                        <input
                            className={style.input}
                            placeholder="Insert health score:"
                            required
                            type="text"
                            value={form.healthScore}
                            onChange={handleInputChange}
                            name="healthScore"
                        />
                        {errors.healthScore && <p>{errors.healthScore}</p>}
                    </div>

                    <div className={style.inputCont}>
                        {/* <label>Analyzed Instructions: </label> */}
                        <h4 className={style.label}>Step by step:</h4>

                        <input
                            className={style.input}
                            placeholder='Insert steps separated by "." :'
                            type="text"
                            value={form.analyzedInstructions}
                            required
                            onChange={handleInputChange}
                            name="analyzedInstructions"
                        />
                        {errors.analyzedInstructions && (
                            <p>{errors.analyzedInstructions}</p>
                        )}
                    </div>

                    <div className={style.inputCont}>
                        {/* <label>Image: </label> */}
                        <h4 className={style.label}>Image:</h4>

                        <input
                            className={style.input}
                            type="text"
                            placeholder="Insert image URL: "
                            name="image"
                            required
                            onChange={handleInputChange}
                            value={form.image}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </div>

                    <div className={style.inputCont}>
                        <h4 className={style.label}>Diets:</h4>
                        <select
                            onChange={handleSelectDiet}
                            className={style.input}
                            required
                            placeholder="Diets"
                            name="diets"
                            type="text"
                        >
                            <option value="">Select a diet:</option>
                            {diets.map((diet, i) => {
                                return (
                                    <option key={i} value={diet}>
                                        {diet}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.diet && <span>{errors.diet}</span>}
                    </div>

                    <div className={style.sidebar_box}>
                        {form.diet.map((diet, i) => (
                            <div
                                key={i}
                                value={diet}
                                className={style.selectedItems}
                            >
                                <p>{diet}</p>
                                <button
                                    type="button"
                                    className={style.x}
                                    onClick={() => handleDeleteDiet(i)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className={style.boton}
                    disabled={hasErrors}
                >
                    CREATE
                </button>
            </form>
        </div>
    );
};
export default Form;
