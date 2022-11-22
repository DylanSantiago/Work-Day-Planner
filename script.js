var moment = moment();
var today = $("#currentDay");

var timeSlot = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var militaryTime = [09, 10, 11, 12, 13, 14, 15, 16, 17];

var timeBlock;
var hourBlock;
var plansBlock;
var saveBtn;

const buildPlanner = () => {
    $.each(timeSlot, function (array, time) {
        timeBlock = $("<section>");
        timeBlock.addClass("row");

        hourBlock = $("<div>");
        hourBlock.addClass("hour col-md-1");
        hourBlock.css("text-align", "center");
        hourBlock.css("font-size", "22px");
        hourBlock.css("padding-top", "25px");
        hourBlock.text(time);
        timeBlock.append(hourBlock);

        plansBlock = $("<textarea>");
        plansBlock.addClass("col-md-10");
        plansBlock.attr("id", militaryTime[array]);
        timeBlock.append(plansBlock);

        saveBtn = $("<button>");
        saveBtn.addClass("saveBtn fas fa-save col-md-1");
        saveBtn.attr("id", militaryTime[array]);
        timeBlock.append(saveBtn);

        $(".container").append(timeBlock);

    });
};

const stylePlanner = () => {
    today.text(moment.format("dddd, MMMM Do, YYYY"));

    $.each(militaryTime, function (array, time){
        plansBlock = $("#" + militaryTime[array]);

        if ((parseInt(plansBlock[0].id) < moment.hour())) {
            plansBlock.addClass("past");

        } else if ((parseInt(plansBlock[0].id) === moment.hour())) {
            plansBlock.addClass("present");
        
        } else {
            plansBlock.addClass("future");
        };
        
        plansBlock = $("#" + militaryTime[array]);
        plansBlock.text(localStorage.getItem("planLog" + militaryTime[array]));
    });
};

const logPlans = (save) => {
    save.preventDefault();
    localStorage.setItem("planLog" + save.currentTarget.id, save.currentTarget.previousSibling.value);
};

buildPlanner();
stylePlanner();
$(".saveBtn").click(logPlans);