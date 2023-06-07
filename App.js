
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

