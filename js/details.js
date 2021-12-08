function showDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("recipe");
  
    fetch(`api/recipes/${recipeId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((recipe) => renderRecipe(recipe));
  }
  
  function renderRecipe(recipe) {
    const { image, title, description, author } = recipe;
    recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      <img src="img/${image}" />
      <h3>${title}</h3>
      <p>${description}</p>
      <p>${author}</p>
      <a href="/">Back</a>
      `;
      editForm.title.value = title;
      editForm.image.value = image;
      editForm.description.value = description;
      editForm.author = author; 
    document.querySelector(".recipe").append(recipeEl);
  }
  
  const updateRecipe = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("recipe");
    const { title, image, description, author, year } = event.target;
    const updatedRecipe = {
      _id: recipeId,
      title: title.value,
      image: image.value,
      description: description.value,
      author: author.value,
      year: year.value, 
    };
    fetch(`api/recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify(updatedRecipe),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(showDetail);
  };
  
  const editForm = document.querySelector("#editForm");
  editForm.addEventListener("submit", updateRecipe);
  
  showDetail();