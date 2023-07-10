import styles from "./card.module.css";

const Card = ({ image, title, diets, healthScore }) => {
    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt="" />

            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.container}>
                    <h5 className={styles.diets}>
                        {diets &&
                            diets.map((diet, i) => <li key={i}>{diet}</li>)}
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Card;
