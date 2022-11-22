// Global Variables
var moment = moment();
var today = $("#currentDay");
var timeSlot = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var militaryTime = [09, 10, 11, 12, 13, 14, 15, 16, 17];
var timeBlock;
var hourBlock;
var plansBlock;
var saveBtn;

// Creates structure of planner by adding HTML and CSS elements through JQuery
const buildPlanner = () => {
    $.each(timeSlot, function (array, time) {
        
        // Each individual timeBlock will have its own <section> tag in the HTML with dynamically generated HTML/CSS that is that is generated here
        timeBlock = $("<section>");
        timeBlock.addClass("row");

        // Elements for each hour
        hourBlock = $("<div>");
        hourBlock.addClass("hour col-md-1");
        hourBlock.css("text-align", "center");
        hourBlock.css("font-size", "22px");
        hourBlock.css("padding-top", "25px");
        hourBlock.text(time);
        timeBlock.append(hourBlock);

        // Elements for plans to be written in for each hour
        plansBlock = $("<textarea>");
        plansBlock.addClass("col-md-10");
        plansBlock.attr("id", militaryTime[array]);
        timeBlock.append(plansBlock);

        // Save button
        saveBtn = $("<button>");
        saveBtn.addClass("saveBtn fas fa-save col-md-1");
        saveBtn.attr("id", militaryTime[array]);
        timeBlock.append(saveBtn);

        // timeBlock is linked with .container class specifying where all Elements created here will be placed on HTML.
        $(".container").append(timeBlock);
    });
};

// Function for styling HTML, giving users color coded information based off what time it currently is
const stylePlanner = () => {
    
    // Displays current date
    today.text(moment.format("dddd, MMMM Do, YYYY"));

    // Links plansBlock's with time of work schedule
    $.each(militaryTime, function (array, time){
        plansBlock = $("#" + militaryTime[array]);

        // Class from style.css is linked if task if in the past
        if ((parseInt(plansBlock[0].id) < moment.hour())) {
            plansBlock.addClass("past");

        // Class from style.css is linked if task if in the present
        } else if ((parseInt(plansBlock[0].id) === moment.hour())) {
            plansBlock.addClass("present");
        
        // Class from style.css is linked if task if in the future
        } else {
            plansBlock.addClass("future");
        };
        
        // Saved plans remain on page despite refresh
        plansBlock = $("#" + militaryTime[array]);
        plansBlock.text(localStorage.getItem("planLog" + militaryTime[array]));
    });
};

// Functions for plans to save to local storage
const logPlans = (save) => {
    save.preventDefault();
    localStorage.setItem("planLog" + save.currentTarget.id, save.currentTarget.previousSibling.value);
};

buildPlanner();
stylePlanner();
$(".saveBtn").click(logPlans);