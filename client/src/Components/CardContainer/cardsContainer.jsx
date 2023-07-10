import Card from "../Card/card";
import { Link } from "react-router-dom";
import style from "./cardsContainer.module.css";

const CardsContainer = ({ recipes }) => {
    return (
        <div className={style.cardcontainer}>
            {recipes?.map((recipe) => (
                <div key={recipe.id} className={style.container}>
                    <Link className={style.link} to={`/recipes/${recipe.id}`}>
                        <Card
                            image={recipe.image}
                            title={recipe.title}
                            diets={recipe.diet}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CardsContainer;
