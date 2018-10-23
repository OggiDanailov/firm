var answer;
$.ajax("https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json").then(function(response){
	answer = JSON.parse(response)
	createEmployees(answer)
	estimate(answer)
	chart(answer)		
})

var listAllEmployees = document.getElementById('listAllEmployees');
var workerList = document.querySelector(".worker-list");
var nameList = "";
var statsButton = document.getElementById('stats-button');
var stats = document.querySelector(".stats");
var myCanvas = document.getElementById("myCanvas");

function createEmployees(x){
	for(let i = 0; i<x.employees.length; i++){
		nameList = document.createElement('div');
		nameList.style.border = '1px solid'
		nameList.style.width = '150px'
		// nameList.style.backgroundColor = 'salmon'
		nameList.style.margin = '10px'
		nameList.style.display = 'inline-block';
		nameList.style.textAlign = 'center'
		workerList.appendChild(nameList)
		nameList.innerHTML = x.employees[i].fname + " " + x.employees[i].lname;

	}
	workerList.style.display = 'none'
}

listAllEmployees.addEventListener('click', function(){
    	statsButton.style.display = 'block'
	 if (workerList.style.display === "none") {
        workerList.style.display = "block";
    } else {
        workerList.style.display = "none";
    }
})
var employeeName = [];
var emploChange = new Function();

function chart(x){
	var myCanvas = document.getElementById('myCanvas').getContext('2d');	
	statsButton.addEventListener('click', function(){
		stats.style.display = 'block';
		for(let i = 0;i<x.employees.length;i++){
			employeeName.push(x.employees[i].fname + " " + x.employees[i].lname);
		}
			console.log(employeeName);
	})
	emploChange = function(){
		return Object.values(x.change)
	}
}

let myChart = new Chart(myCanvas,{
	type: 'bar',
	data: {
		labels: employeeName,
		datasets: [{
			label: 'Money Spent on Business Trip',
		data: emploChange()	
		}]
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
var img = document.getElementById('img')
var imgList = document.getElementById('img-list')
var images = document.querySelector('.images')

submit.addEventListener('click', function(){
	$.ajax("https://bitbucket.org/OggiDanailov/firm/raw/2df585250847781831c5ab8ab4a7fdff8f5ef8fc/finances.json").then(function(response){
	answer = JSON.parse(response)
		printDetails(answer)
		getSelectedText()
	})
})

function getSelectedText() {
    return list.options[list.selectedIndex].text;
}

function printDetails(x){
	var result = 0;
	if(getSelectedText() == 'Fname'){
		console.log('Fname')
		a.style.display = 'block';
		b.style.display = 'none';
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

	if(getSelectedText() == 'Lname'){
		console.log("Lname")
		a.style.display = 'block';
		b.style.display = 'none';
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

	// Experience selector
	if(getSelectedText() == 'Experience'){
			a.style.display = 'none';
			b.style.display = 'block';		
		for(let i = 0;i<x.employees.length;i++){
			if(worker.value == x.employees[i].experience){
				yearsText.innerHTML = worker.value + " years of experience"
				nameListYears.style.margin = '5px'
				nameListYears.innerHTML += x.employees[i].fname + " " + x.employees[i].lname + " " +  x.employees[i].city +" "+  worker.value + " years of expreience"+ "<br />" ;
			}	
		}	
	}
	// Location selector
	if(getSelectedText() == 'Location'){
		images.style.display = 'grid';
		var city = worker.value
		for(let i =0;i<x.employees.length;i++){
			if(worker.value == x.employees[i].city){
				imgList.innerHTML += x.employees[i].fname + " " + x.employees[i].lname + "<br>";	
				for(let j = 0;j<x.images.length;j++){

					if(Object.keys(x.images[j]) == city){
						console.log(Object.values(x.images[j])[0])
						img.style.backgroundImage = "url(" + Object.values(x.images[j])[0]  + ")";
						img.style.backgroundSize = "100% 100%"	
					}
				}									
			}
		}
	}
	if(getSelectedText() != "Location"){
		images.style.display = 'none';
	}
}












