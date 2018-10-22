var answer;
$.ajax("https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json").then(function(response){
	answer = JSON.parse(response)
	createEmployees(answer)
	estimate(answer)
})

var listAllEmployees = document.getElementById('listAllEmployees')
var workerList = document.querySelector(".worker-list")
var nameList = "";

function createEmployees(x){
	for(let i = 0; i<x.employees.length; i++){
		nameList = document.createElement('div');
		nameList.style.border = '1px solid'
		nameList.style.width = '150px'
		nameList.style.backgroundColor = 'salmon'
		nameList.style.margin = '10px'
		nameList.style.display = 'inline-block';
		nameList.style.textAlign = 'center'
		workerList.appendChild(nameList)
		nameList.innerHTML = x.employees[i].fname + " " + x.employees[i].lname;

	}
	workerList.style.display = 'none'
}

listAllEmployees.addEventListener('click', function(){
	 if (workerList.style.display === "none") {
        workerList.style.display = "block";
    } else {
        workerList.style.display = "none";
    }
})

var budget = document.querySelector(".budget")
function estimate(obj){
	var array = [];
	var mergedArray = [];
	var expenses = 0;
	
	for(let i = 0;i<obj.budget.length;i++){
		array.push(Object.values(obj.budget[i]))
	}	
	for(let i =0;i<array.length;i++){
		for(let j = 0;j<array[i].length;j++){
			mergedArray.push(array[i][j])
		}
	}
	expenses = mergedArray.reduce(function(a,b){
		return a + b;
	})
	budget.innerHTML =  "Travelling Budget" + '<br>' + "$" + expenses;
	// budget.innerHTML = "$" + expenses;
}	

var submit = document.getElementById('submit')
var list = document.getElementById('list')
var worker = document.getElementById('worker')
var resume = document.getElementById('resume')
var nameEmpl = document.getElementById('name-emp')
var lastName = document.getElementById("last-name")
var moneySpent = document.getElementById("money-spent")
var moneyPercentage = document.getElementById("money-percentage")
var experience = document.getElementById('experience')
let years = document.getElementById('years')
var a = document.querySelector(".A")
var b = document.querySelector(".B")
var nameListYears = document.querySelector("#name-list-years");
var yearsText = document.querySelector("#years-text")
var heroes = []

submit.addEventListener('click', function(){
	$.ajax("https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json").then(function(response){
	answer = JSON.parse(response)
		printDetails(answer)
	})
})

function printDetails(x){
	var result = 0;
	if(list.options[0].text == 'Fname'){
		// a.style.display = 'block';
		// b.style.display = 'none';
		for(let i = 0;i<Object.keys(x.change).length; i++){
			if(worker.value == Object.keys(x.change)[i]){
				nameEmpl.innerHTML = Object.keys(x.change)[i]
				lastName.innerHTML = x.employees[i].lname; 
				moneySpent.innerHTML ="$" + Object.values(x.change)[i]
				result = (Object.values(x.change)[i]*100) / 810;
				moneyPercentage.innerHTML = (100 - result.toFixed(1)) + "%"
				years.innerHTML = x.employees[i].experience
				if(result < 70){
					heroes.push(Object.keys(x.change)[i])
				}
			}	
		}
	}

	if(list.options[1].text == 'Lname'){
		// a.style.display = 'block';
		// b.style.display = 'none';
		for(let i = 0;i<x.employees.length;i++){
			if(worker.value == x.employees[i].lname){
				nameEmpl.innerHTML = x.employees[i].fname;
				lastName.innerHTML = x.employees[i].lname;
				moneySpent.innerHTML ="$" + Object.values(x.change)[i]
				result = (Object.values(x.change)[i]*100) / 810;
				moneyPercentage.innerHTML = (100 - result.toFixed(1)) + "%"
				years.innerHTML = x.employees[i].experience;
			}		
		}
	}

	if(list.options[2].text == 'Experience'){
		console.log(list.option)
			// a.style.display = 'none';
			// b.style.display = 'block';		
		for(let i = 0;i<x.employees.length;i++){
			if(worker.value == x.employees[i].experience){
				yearsText.innerHTML = worker.value + " years of experience"
				nameListYears.style.margin = '5px'
				nameListYears.innerHTML += x.employees[i].fname + " " + x.employees[i].lname + " " +  x.employees[i].city +" "+  worker.value + " of expreience"+ "<br />" ;
			}	
		}	
	}

}






