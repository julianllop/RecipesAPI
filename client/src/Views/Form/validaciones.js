const lettersOrSpacesREGEX = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const numberREGEX = /^[0-9]+$/;
// const imageURLREGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
const imageURLREGEX = /\.(jpeg|jpg|gif|png)$/i;
export function validate(form, recipes) {
    // recibe el estado del formulario
    let errors = {};

    let existingRecipe =
        recipes &&
        form.title &&
        recipes.find(
            (recipe) => recipe.title.toLowerCase() === form.title.toLowerCase()
        );

    if (existingRecipe) {
        errors.title = "Title already exists";
    }

    if (!form.title.trim()) {
        errors.title = "Recipe's title can't be empty";
    }
    // if(recipes.includes(form.title.toLowerCase())){
    //     errors.title = "This title already exists";
    // }
    if (form.title.length > 100) {
        errors.title = "Recipe's title can't be more than 100 characters";
    }
    if (!lettersOrSpacesREGEX.test(form.title.trim()) && form.title) {
        errors.title = 'Just "," , "." , letters and blank spaces';
    }
    /************************************************************************************ */
    if (!form.summary) {
        errors.summary = "Summary can't be empty";
    }
    if (form.summary.length < 15 && form.summary.length > 0) {
        errors.summary = "Summary must be at least 15 characters";
    }
    if (form.summary.length > 100) {
        errors.summary = "Summary can't be more than 100 characters";
    }
    /************************************************************************************ */
    if (!numberREGEX.test(form.healthScore)) {
        errors.healthScore = "Just numbers";
    }
    if (!form.healthScore) {
        errors.healthScore = "Health score can't be empty";
    }
    if (form.healthScore < 0) {
        errors.healthScore = "Health score must be bigger than 0";
    }
    if (form.healthScore > 100) {
        errors.healthScore = "Health score must be lower than 100";
    }
    /************************************************************************************ */
    if (!form.analyzedInstructions) {
        errors.analyzedInstructions = "Steps can't be empty";
    }
    if (
        form.analyzedInstructions.length < 15 &&
        form.analyzedInstructions.length
    ) {
        errors.analyzedInstructions = "Steps must be at least 15 characters";
    }
    if (!form.analyzedInstructions.includes(".")) {
        errors.analyzedInstructions = 'Steps must be separated by "." ';
    }
    /************************************************************************************ */

    if (!form.image) {
        errors.image = "Image URL can't be empty";
    }
    if (!imageURLREGEX.test(form.image)) {
        errors.image = "URL not valid";
    }

    /*********************************************************************************** */

    if (!form.diet.length > 0) {
        errors.diets = "Can't create a recipe without any type of diet";
    }

    return errors;
}
