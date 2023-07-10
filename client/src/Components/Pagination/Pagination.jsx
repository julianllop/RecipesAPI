import React from "react";
import styles from "./Pagination.module.css";

export default function Paginate({ currentPage, allRecipes, paginate }) {
    const totalPages = Math.ceil(allRecipes / 10); // Total de páginas

    let numbers = [];
    let startPage = 1;
    let endPage = Math.min(totalPages, 5); // Limitar a un máximo de 5 páginas mostradas

    // Establecer el rango de páginas a mostrar
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
        endPage = totalPages;
    } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
    }

    const handlerPaginater = (numero) => {
        paginate(numero);
    };

    const handlerAdelante = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const handlerAtras = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };
    const handlerFirst = () => {
        paginate((currentPage = 1));
    };

    const handlerLast = () => {
      console.log(totalPages);
            paginate((currentPage = totalPages));
    };

    return (
        <div className={styles.Pagination}>
            <button className={styles.direction} onClick={handlerFirst}>
                {"<<<"}
            </button>
            <button className={styles.direction} onClick={handlerAtras}>
                {"< Previous"}
            </button>
            {/* {startPage > 1 && (
        <>
          <button className={styles.btn} onClick={() => handlerPaginater(1)}>
            1
          </button>
          {startPage > 2 && <button className={styles.disabled}>...</button>}
        </>
      )} */}
            {currentPage >= 4 && (
                <button disabled={"true"} className={styles.btnDisabled}>
                    ...
                </button>
            )}
            {numbers?.map((numero) => {
                return (
                    <button
                        className={
                            currentPage !== numero ? styles.btn : styles.current
                        }
                        onClick={() => handlerPaginater(numero)}
                        key={numero}
                    >
                        {numero}
                    </button>
                );
            })}
            {currentPage < 10 && (
                <button disabled={"true"} className={styles.btnDisabled}>
                    ...
                </button>
            )}
            <button className={styles.direction} onClick={handlerAdelante}>
                {"Next >"}
            </button>
            <button className={styles.direction} onClick={handlerLast}>
                {">>>"}
            </button>
        </div>
    );
}
