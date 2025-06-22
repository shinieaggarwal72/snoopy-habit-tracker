var date = new Date();
//console.log(date);

var currMonth = date.getMonth();
var currDay = date.getDay();
var currDate = date.getDate();
var currYear = date.getFullYear();

var months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"
];

var monthTitle = document.getElementById("title");
monthTitle.innerText = months[currMonth];

var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = () => {
    let habit = prompt('Add a habit: ', habitTitle.innerHTML);
    if(habit.length > 0){
        habitTitle.innerText = habit;
    }
}

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysCurrMonth = daysInMonth[currMonth];
//console.log(daysCurrMonth);

var totDays = document.getElementById("totalDays");
var completedDays = 0;
totDays.innerText = "Day: " + completedDays + "/"+daysCurrMonth;

var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");
for(var i=0; i<days.length; i++){
    var day = days[rowCount].getElementsByClassName("day");
    //console.log(day);
    for(var j=0; j<day.length; j++){
        //console.log(daysCurrMonth);
        if(dayCount == currDate-1){
            //console.log("dayCount == currDate-1")
            day[j].style.border = "2px solid black";
            day[j].style.backgroundColor = "#4169E1";
        }
        if(dayCount < daysCurrMonth){
            day[j].innerHTML = dayCount+1;
            day[j].setAttribute("id", "day"+(dayCount+1));
            dayCount++;
        }
        else{
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color: #6495ED");
        }
        
    }rowCount++;
}

for(var i=0; i<currDate; i++){
    var tempStr = " "+(i+1)+"-"+(currMonth+1)+"-"+(currYear);
    //console.log(tempStr);
    var choosenDay = localStorage.getItem(tempStr);
    console.log(choosenDay);
    var choosenDayDiv = document.getElementById("day"+(i+1));
    if(choosenDay === "true"){
        choosenDayDiv.style.backgroundColor = "#4169E1";
    }
    else{
        choosenDayDiv.style.backgroundColor = "#6495ED";
    }
}

var dayDivs = document.querySelectorAll(".day");

for(let i=0; i<currDate; i++){
    var num = i+1;
    var thisDate = document.getElementById("day"+(num));
    var storageStr = ""+num+"-"+(currMonth+1)+"-"+(currYear);
    if(localStorage.getItem(storageStr) === "true"){
        thisDate.style.backgroundColor ="#6495ED";
        completedDays++;
    }
    totDays.innerHTML = completedDays+ "/" + daysCurrMonth;
}

for(let i=0; i<currDate; i++){
    dayDivs[i].onclick = (e) =>{
        //console.log(e);
        var num = e.target.innerText;
        //console.log(num);
        var selectedDate = document.getElementById(e.target.id);
        var storageStr = ""+num+"-"+(currMonth+1)+"-"+(currYear);
        if(localStorage.getItem(storageStr) === "false"){
            selectedDate.style.backgroundColor ="#4169E1";
            localStorage.setItem(storageStr, "true");
            completedDays++;
        }
        else if(localStorage.getItem(storageStr) === "true"){
            selectedDate.style.backgroundColor ="#6495ED";
            localStorage.setItem(storageStr, "false");
            completedDays--;
        }
        else{
            selectedDate.style.backgroundColor ="#4169E1";
            localStorage.setItem(storageStr, "true");
            completedDays++;
        }
        totDays.innerHTML = completedDays+ "/" + daysCurrMonth;
        if(completedDays === currDate){
            alert("You're doing great! Snoopy is cheering for you ^-^");
        }
    }
}

var resetBtn = document.getElementById("reset");
resetBtn.onclick = () => {
    localStorage.clear();
    for(var i=0; i<dayCount; i++){
        var thisDay = document.getElementById("day"+(i+1));
        thisDay.style.backgroundColor = "#6495ED";
    }
    completedDays = 0;
    totDays.innerHTML = completedDays+ "/" + daysCurrMonth;

}


