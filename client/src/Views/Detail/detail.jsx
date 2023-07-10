import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getRecipe } from "../../Redux/actions";
import style from "./detail.module.css";

function Detail() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipesById);
    console.log(recipe);

    useEffect(() => {
        dispatch(getRecipe(id));
        dispatch(clearState(id));
    }, [dispatch, id]);

    return (
        <div>
            <div className={style.container}>
                <div className={style.bigCard}>
                    <h1>{recipe.title} </h1>
                    <div className={style.card}>
                        <img
                            className={style.image}
                            src={recipe.image}
                            alt=""
                        />
                        <h5 className={style.diets}>
                            Diets:
                            {recipe.diet &&
                                recipe.diet.map((diet, i) => (
                                    <li key={i}>{diet}</li>
                                ))}
                        </h5>
                        <div
                            className={
                                recipe.healthScore > 60
                                    ? style.healthy
                                    : recipe.healthScore < 40
                                    ? style.unhealthy
                                    : style.regular
                            }
                        >
                            <h5 className={style.score}>Healthscore: </h5>
                            <h3 className={style.score}>
                                {recipe.healthScore}
                            </h3>
                        </div>
                    </div>
                    <div className={style.summaryCont}>
                        <h2>Summary:</h2>
                        <p className={style.summary}> {recipe.summary}</p>
                    </div>
                    <div className={style.stepCont}>
                        <h2>Step by step:</h2>
                        <ol className={style.steps}>
                            {isNaN(recipe.id)
                                ? recipe.analyzedInstructions && recipe.analyzedInstructions.split(".").map((step, i) => (
                                      <li key={i}>
                                          <p className={style.enum}>{i + 1}.</p>{" "}
                                          <p>{step}.</p>
                                      </li>
                                  ))
                                : Array.isArray(recipe.analyzedInstructions) &&
                                  recipe.analyzedInstructions &&
                                  recipe.analyzedInstructions.map((step, i) => (
                                      <li key={i}>
                                          <p className={style.enum}>{i + 1}.</p>{" "}
                                          <p>{step}</p>
                                      </li>
                                  ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Detail;
