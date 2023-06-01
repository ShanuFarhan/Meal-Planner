// function fetchData() {
//     fetch(' https://api.spoonacular.com/mealplanner/generate?apiKey=912b9319e0c74847a39150aefa3b6843&timeFrame=day')
//     .then(response => response.json())
//     .then(data => {
//     //   var result = JSON.parse(JSON.stringify(data));
//     //   document.getElementById('result').innerText = 'Your Ideal Meals for the Day:\n';
//     //   for(let i=0;i<result.meals.length;i++)
//     //   {
//     //       console.log(result.meals[i])
//     //       document.getElementById('result').innerText += '\n'+JSON.stringify(result.meals[i].title).slice(1, -1);+'\n';
//     //   }
//     console.log(data);
//     })
//     .catch(error => 
//       {
//       console.log('Error:', error);
//       document.getElementById('result').innerText = 'Error occurred while fetching data.';
//     });
//   }
  var mealids=[];
  function calculateBMR() {
    // Get user input
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById('gender').value;
    var activityLevel = parseFloat(document.getElementById("activity-level").value);

    // Calculate BMR
    var bmr;
    if (gender === "female") {
      bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    } else {
      bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    }

    // Calculate daily calorie requirement based on activity level
    var calorieRequirement = bmr * activityLevel;

    // Display results
    document.getElementById("bmr-result").textContent = bmr.toFixed(2);
    document.getElementById("calorie-requirement").textContent = calorieRequirement.toFixed(2);
  }

  function generateMealPlan() {
    // Get the daily calorie requirement
    var calorieRequirement = parseFloat(document.getElementById("calorie-requirement").textContent);

    // Make an API request to generate a meal plan
    var apiKey = "912b9319e0c74847a39150aefa3b6843";
    var apiUrl = "https://api.spoonacular.com/mealplanner/generate";

    var requestUrl = `${apiUrl}?apiKey=${apiKey}&timeFrame=day&targetCalories=${calorieRequirement}`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // Get the meal plan from the API response
        var mealPlan = data.meals;
        var meal1=document.getElementById('meal-1')
        var meal2=document.getElementById('meal-2')
        var meal3=document.getElementById('meal-3')
        // Populate the meal-plan section with the data
        // var mealPlanSection = document.getElementById("meal-plan");

        // // Clear any existing content
        // mealPlanSection.innerHTML = "";

        // // Create and append meal cards for each meal in the plan
        // for(let meal=0;meal<mealPlan.length;meal++) { 
        //   var mealCard = document.createElement("div");
        //   mealCard.className = "meal-card";

        //   var mealImage = document.createElement("img");
        //   mealImage.src = meal.image;
        //   mealImage.alt = meal.title;
        //   mealCard.appendChild(mealImage);

        //   var mealName = document.createElement("h3");
        //   mealName.textContent = meal.title;
        //   mealCard.appendChild(mealName);

        // //   var mealCalories = document.createElement("p");
        // //   mealCalories.textContent = "Calories: " + nutrients[0];
        // //   mealCard.appendChild(mealCalories);

        //   var getRecipeBtn = document.createElement("a");
        //   getRecipeBtn.className = "get-recipe-btn";
        //   getRecipeBtn.href = meal.sourceUrl;
        //   getRecipeBtn.textContent = "Get Recipe";
        //   mealCard.appendChild(getRecipeBtn);

        //   mealPlanSection.appendChild(mealCard);
        // };

        // Show the meal-plan section
        // mealPlanSection.style.display = "block";
        meal1.innerHTML=data.meals[0].title;
        meal2.innerHTML=data.meals[1].title;
        meal3.innerHTML=data.meals[2].title;
        mealids=[data.meals[0].id,data.meals[1].id,data.meals[2].id]
      })
      .catch(error => {
        console.log(error);
      });
  }
  function GetRecipe(i){
    var title=document.getElementById('meal-'+i).innerHTML;
    var id=mealids[i-1]
    var apiKey = "912b9319e0c74847a39150aefa3b6843";
    var apiUrl = "https://api.spoonacular.com/recipes/"+id+"/information";

    var requestUrl = `${apiUrl}?apiKey=${apiKey}`;
   
    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      //  for(let i=0;i<data.extendedIngredients.length;i++){
      //     ingredients+='\n'+data.extendedIngredients[i].name+'\n'
      //     console.log(data.extendedIngredients[i].name)
      //  }
      var ingredients=document.getElementById('ing');
      var ste=document.getElementById('steps');
      var sum=document.getElementById('summary');
      ingredients.innerHTML=data.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('');
      ste.innerHTML=data.instructions
      sum.innerHTML=data.extendedIngredients.map(equipment => `<li>${equipment.original}</li>`).join('');
    })
      .catch(error => {
        console.log(error);
      });
  }

