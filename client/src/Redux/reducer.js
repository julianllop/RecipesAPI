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

const initialState = {
    recipes: [],
    allRecipes: [], //copia
    recipesById: [],
    diets: [],
    allDiets: [],
    newRecipe: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RECIPE:
            return {
                ...state,
                newRecipe: action.payload,
            };

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };

        case GET_RECIPE:
            return {
                ...state,
                recipesById: action.payload,
            };

        case CLEAR_STATE:
            return {
                ...state,
                recipesById: [],
            };

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
                allDiets: action.payload, //filter
            };

        case GET_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
            };

        case RECIPE_DETAIL:
            return {
                ...state,
                recipesById: action.payload,
            };

        //ordenados---------------------------------------------------------------
        case ORDER_BY_NAME:
            const sortedByName =
                action.payload === "asc_name"
                    ? state.recipes.sort((a, b) => {
                          if (a.title > b.title) {
                              return 1;
                          }
                          if (b.title > a.title) {
                              return -1;
                          }
                          return 0;
                      })
                    : action.payload === "desc_name"
                    ? state.recipes.sort((a, b) => {
                          if (a.title > b.title) {
                              return -1;
                          }
                          if (b.title > a.title) {
                              return 1;
                          }
                          return 0;
                      })
                    : state.recipes;
            console.log(sortedByName);
            return {
                ...state,
                recipes: sortedByName,
            };

        case ORDER_BY_SCORE:
            const sortedByScore =
                action.payload === "asc_score"
                    ? state.recipes.sort(function (a, b) {
                          return (
                              parseInt(a.healthScore, 10) -
                              parseInt(b.healthScore, 10)
                          );
                      })
                    : action.payload === "desc_score"
                    ? state.recipes.sort(function (a, b) {
                          return (
                              parseInt(b.healthScore, 10) -
                              parseInt(a.healthScore, 10)
                          );
                      })
                    : state.recipes;
            return {
                ...state,
                recipes: sortedByScore,
            };

        case FILTER_BY_CREATOR:
            const recipes = state.allRecipes;

            const createdFilter =
                action.payload === "All"
                    ? state.allRecipes
                    : action.payload === "Api"
                    ? recipes.filter((recipe) => recipe.createdInDb === false)
                    : recipes.filter((recipe) => recipe.createdInDb === true);
            return {
                ...state,
                recipes: createdFilter,
            };

        //filter -------------------------------------------------------------------
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            let filteredRecipes = [];
            if (action.payload === "All") {
                filteredRecipes = state.allRecipes;
            } else {
                for (let i = 0; i < allRecipes.length; i++) {
                    if (
                        allRecipes[i].diet &&
                        Array.isArray(allRecipes[i].diet)
                    ) {
                        let found = allRecipes[i].diet.find(
                            (diet) => diet === action.payload
                        );
                        if (found) {
                            filteredRecipes.push(allRecipes[i]);
                        }
                    }
                }
            }
            return {
                ...state,
                recipes: filteredRecipes,
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
