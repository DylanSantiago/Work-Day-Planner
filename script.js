var moment = moment();
var today = $("#currentDay");

var timeSlot = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var militaryTime = [09, 10, 11, 12, 13, 14, 15, 16, 17];

var timeBlock;
var hourBlock;
var plansBlock;
var saveBtn;

const planDay = () => {
    $.each(timeSlot, function (array, time) {
        timeBlock = $("<section>");
        timeBlock.addClass("row");

        hourBlock = $("<div>");
        hourBlock.addClass("hour col-md-1");
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

planDay();


