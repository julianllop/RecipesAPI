import axios from "axios";
import {
    CLEAR_STATE,
    GET_RECIPES,
    GET_RECIPE,
    GET_BY_NAME,
    GET_DIETS,
    CREATE_RECIPE,
    ORDER_BY_NAME,
    ORDER_BY_SCORE,
    RECIPE_DETAIL,
    FILTER_BY_DIET,
    FILTER_BY_CREATOR,
} from "./actionTypes";

export const getRecipe = (id) => {
    return (dispatch) =>
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((resp) => resp.json())
            .then((recipe) => {
                dispatch({
                    type: GET_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
};

export const clearState = () => {
    return { type: CLEAR_STATE };
};

export const getRecipes = () => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get("/recipes");
            const recipes = apiData.data;
            return dispatch({ type: GET_RECIPES, payload: recipes });
        } catch (error) {
            console.log("Ocurrio un error: ", error);
        }
    };
};

export function getDiets() {
    return async (dispatch) => {
        try {
            const allDiets = await axios.get("/diets");
            const diets = allDiets.data;
            const listOfDiets = diets.map((diet) => diet.name);
            return dispatch({
                type: GET_DIETS,
                payload: listOfDiets,
            });
        } catch (error) {
            console.log("Ocurrio un error: ", error);
        }
    };
}

export function getByName(title) {
    return async (dispatch) => {
        try {
            const recipe = await axios.get(`/recipes?title=${title}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: recipe.data,
            });
        } catch (error) {
            console.log("There is not a recipe with that name ", error);
        }
    };
}

export function createRecipe(payload) {
    const request = {
        url: "/recipes",
        method: "POST",
        data: payload,
    };
    return async (dispatch) => {
        return axios(request).then((response) => {
            dispatch({ type: CREATE_RECIPE, payload: response.data.results });
        });
    };
}

export const recipeDetail = (id) => {
    return async (dispatch) => {
        await axios
            .get("recipes/" + id)
            .then((response) => response.data.results)
            .then((detail) => {
                dispatch({
                    type: RECIPE_DETAIL,
                    payload: detail,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

// ORDERS -------------------------------

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload,
    };
};

export const orderByScore = (payload) => {
    return {
        type: ORDER_BY_SCORE,
        payload,
    };
};

export const ORDER_BY_CREATOR = "ORDER_BY_CREATOR";
export function orderByCreator(payload) {
    return {
        type: ORDER_BY_CREATOR,
        payload,
    };
}
// FILTERS -------------------------------

export const filterByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload,
    };
};

export const filterByCreator = (payload) => {
    return {
        type: FILTER_BY_CREATOR,
        payload,
    };
};
