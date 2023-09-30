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

        // On crée un conteneur pour les cartes
        const container = document.createElement("div");
        container.id = "results"; // On utilise "results" comme conteneur

        meals.forEach((meal) => {
            // On crée une carte pour chaque repas
            const bloc = document.createElement("div");
            bloc.className = "card";

            // On crée une liste ul pour les ingrédients
            const ul = document.createElement("ul");

            // Il y a 20 ingrédients max, donc tant que i est inférieur à 21, on l'incrémente
            for (let i = 1; i < 21; i++) {
                // On interroge le n° de strIngredient
                // Revient à écrire : if (meal[`strIngredient${i}`] === true) { 
                if (meal[`strIngredient${i}`]) {
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];

                    // Crée un élément li pour chaque ingrédient
                    const liIngredient = document.createElement("li");
                    liIngredient.textContent = `${ingredient} - ${measure}`;

                    // Ajoute l'élément li à la liste ul
                    ul.appendChild(liIngredient);
                }
            }

            const h2 = document.createElement("h2");
            h2.textContent = meal.strMeal;

            const p = document.createElement("p");
            p.textContent = meal.strArea;

            const img = document.createElement("img");
            img.src = meal.strMealThumb;
            img.alt = `photo ${meal.strMeal}`;

            bloc.appendChild(h2);
            bloc.appendChild(p);
            bloc.appendChild(img);
            bloc.appendChild(ul);

            container.appendChild(bloc);
        });

        // On remplace le contenu de results par le conteneur des cartes
        results.textContent = "";
        results.appendChild(container);
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