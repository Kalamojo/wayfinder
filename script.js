let state = 0;
let answers = [];
const questions = ["What's your favorite color?", "What's your favorite activity?", "What's your favorite animal?", "What's your favorite movie genre?", "What's your favorite food?"];
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const sub = document.querySelector("#sub");
const main = document.querySelector("#main");
const input = document.querySelector("#input");
const mainSection = document.querySelector("#main-section");
const resultSection = document.querySelector("#result-section");
const place = document.querySelector("#place");
const description = document.querySelector("#description");

/*apiCall =  async (s) => {
  console.log("Works");
	const search = `https://kalamojo.pythonanywhere.com/api?search=${s}`
  const response = await fetch(search, {
      //mode: 'no-cors',
      mode: 'no-cors',
    }
    //return response.json();
                              );
  //console.log(response);
  const myJson = await response.json();
  console.log(myJson);

};

apiCall("running along a beach");*/

async function search(s){
  let queryResults = `https://kalamojo.pythonanywhere.com/api?search=${s}`;
  const response = await fetch(queryResults);
  const responseJson = await response.json();
  place.innerText = responseJson[1][1] + "!";
  description.innerText = responseJson[1][0];
}



function next() {
  if(state<=5){
    state++;
  }
  if(state!=1) {
    if(input.value == ""){
      state--;
      alert("Please enter an answer.");
    }
    else
      answers[state-2] = input.value;
  }
  else {
    prevButton.classList.remove("hidden");
    input.classList.remove("hidden");
    nextButton.textContent = "Next";
    sub.classList.add("hidden");
    updateQuestion();
  }
  if(!input.value == "")
    updateQuestion();
	if (state > 5) {
		search(answers.join("+"));
    mainSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
	}
	
}


function prev() {
  if(state>1)
    state--;
  updateQuestion();
}

let myTimeout;
function updateQuestion() {
  console.log(state);
	if (state <= 5) {
		clearTimeout(myTimeout);
		main.innerText = "";
		var i = 0;
		var txt = questions[state-1]; /* The text */
		console.log(questions[state-1]);
		var speed = 50; /* The speed/duration of the effect in milliseconds */
		function typeWriter() {
		  if (i < txt.length) {
			main.innerHTML += txt.charAt(i);
			i++;
			myTimeout = setTimeout(typeWriter, speed);
		  }
		}
		typeWriter();
	}
	
  //main.innerText = questions[state-1];
  if(!answers[state-1]==undefined){
    input.value = answers[state-1];
  }
  else {
    input.value = "";
  }
  console.log(answers)
}

