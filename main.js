var searchContainer = document.getElementById("searchContainer");
var recipe = document.getElementById("recipe");
var searchBtn = document.getElementById("searchBtn");
var recipeContainer = document.getElementById("recipeContainer");
var recipePrep = document.getElementById("recipePrep");
var recipeImageContainer = document.getElementById("recipeImageContainer");
var recipeDetailContainer = document.getElementById("recipeDetailContainer")

const key = "c73d344bb88f409fa6341db4a4c39de5";


searchBtn.addEventListener('click', () => {

	fetch("https://api.spoonacular.com/recipes/complexSearch?query=" + recipe.value + "&apiKey=" + key + "&addRecipeInformation=true", {
		"method": "GET",
	})
		.then(response => response.json())
		.then(data => {
			// console.log(data.results)

			while (recipeImageContainer.hasChildNodes()) {
				recipeImageContainer.removeChild(recipeImageContainer.firstChild);
			}

			while (recipeContainer.hasChildNodes()) {
				recipeContainer.removeChild(recipeContainer.firstChild);
			}
			while (recipeDetailContainer.hasChildNodes()) {
				recipeDetailContainer.removeChild(recipeDetailContainer.firstChild);
			}

			for (let i = 0; i < data.results.length; i++) {
				// console.log(data.results[i]);

				const recipeImageContainer = document.createElement("div");
				recipeImageContainer.setAttribute("id", i);
				recipeImageContainer.setAttribute("onclick", "getId(this)")


				recipeImageContainer.setAttribute("class", "recipeImageContainer")
				const recipeImage = document.createElement("img")
				recipeImage.setAttribute("src", data.results[i].image)
				recipeImageContainer.appendChild(recipeImage);
				recipeContainer.appendChild(recipeImageContainer);


				const recipeLabel = document.createElement("label")
				const recipeName = document.createTextNode(data.results[i].title);
				recipeLabel.appendChild(recipeName);
				recipeImageContainer.appendChild(recipeLabel);
			}

			window.arr = [];
			arr = data.results;
			console.log(arr);
		})
		.catch(err => {
			console.error(err);
			const error = document.createElement("h1");
			error.innerHTML = "You have reached the daily Limit. Please try again next day. Thank You !";
			recipeDetailContainer.appendChild(error)
		});
	window.getId = function (btn) {

		while (recipeImageContainer.hasChildNodes()) {
			recipeImageContainer.removeChild(recipeImageContainer.firstChild);
		}
		const recipeImage = document.createElement("img");
		recipeImage.setAttribute('src', arr[btn.id].image);
		recipeImage.setAttribute('class', "recipeBigImage")
		recipeImageContainer.appendChild(recipeImage)

		while (recipeDetailContainer.hasChildNodes()) {
			recipeDetailContainer.removeChild(recipeDetailContainer.firstChild);
		}

		const recipeName = document.createElement("h1")
		recipeName.innerHTML = arr[btn.id].title;
		recipeDetailContainer.appendChild(recipeName)

		for (let i = 0; i < arr[btn.id].analyzedInstructions[0].steps.length; i++) {


			const stepDetailEle = document.createElement("p")
			const stepCount = document.createElement("span");

			stepCount.innerHTML = "Step " + arr[btn.id].analyzedInstructions[0].steps[i].number + " : ";
			stepDetailEle.appendChild(stepCount);
			recipeDetailContainer.appendChild(stepDetailEle);
			const stepDetail = document.createTextNode(arr[btn.id].analyzedInstructions[0].steps[i].step);
			stepDetailEle.appendChild(stepDetail)
		}
	}
})

