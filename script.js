// Lien API : https://www.themealdb.com/api/json/v1/1/search.php?s=
const form = document.querySelector('form');
const input = document.getElementById("search");
const results = document.getElementById("results");

let meals = [];

// Fonction pour incrémenter notre data (tableau vide de meals)
async function fetchMeals(search) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((response) => response.json()
        .then((data) => meals = data.meals)
    );

    // console.log(meals);
}

function mealsDisplay() {
    if (meals === null) {
        results.textContent = "Aucun résultat";
    } else {
        meals.length = 12;

        // Créez un conteneur ul pour les éléments
        const ul = document.createElement("ul");

        meals.forEach((meal) => {
            let ingredients = [];

            // Il y a 20 ingrédients max, donc tant que i est inférieur à 21, on l'incrémente
            for (let i = 1; i < 21; i++) {
                // On interroge le n° de strIngredient
                // Revient à écrire : if (meal[`strIngredient${i}`] === true) { 
                if (meal[`strIngredient${i}`]) {
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];

                    ingredients.push(`${ingredient} - ${measure}`);
                }
            }
            // console.log(ingredients);

            // Créez un élément li pour chaque repas
            const li = document.createElement("li");
            li.className = "card";

            const h2 = document.createElement("h2");
            h2.textContent = meal.strMeal;

            const p = document.createElement("p");
            p.textContent = meal.strArea;

            const img = document.createElement("img");
            img.src = meal.strMealThumb;
            img.alt = `photo ${meal.strMeal}`;

            const ulIngredients = document.createElement("ul");
            ulIngredients.textContent = ingredients.join(" - ");

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(img);
            li.appendChild(ulIngredients);

            ul.appendChild(li);
        });

        // On remplace le contenu de results par le conteneur ul
        results.textContent = "";
        results.appendChild(ul);
    }
};

// On récupère ce qui est tapé dans l'input
input.addEventListener("input", (event) => {
    fetchMeals(event.target.value);

    // Si on veut un affichage en temps réel
    // fetchMeals(event.target.value).then(() => mealsDisplay());
});

// Quand l'utilisateur validera le formulaire on affiche les repas
form.addEventListener("submit", (event) => {
    event.preventDefault();
    mealsDisplay();
});
