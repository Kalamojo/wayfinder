// add class is-loading
const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const place = document.querySelector("#place");
const description = document.querySelector("#description");

async function find(s){
  let queryResults = `https://kalamojo.pythonanywhere.com/api?search=${s}`;
  const response = await fetch(queryResults);
  const responseJson = await response.json();
  place.innerText = responseJson[1][1] + "!";
  description.innerText = responseJson[1][0];
}

submit.addEventListener('click', () => {
	search.parentElement.classList.add("is-loading");
	find(search.value);
	search.value = "";
	search.parentElement.classList.remove("is-loading");
})

