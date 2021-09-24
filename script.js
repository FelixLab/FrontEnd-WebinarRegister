//global variable, for to save showed elements
//represent how many people
var k;
//initialize forms
$(function () {
    hideAllStep1();
    hideAllStep2();
    hideAllStep3();
});
//all step 1
function hideAllStep1() {
    var max = parseInt($('#num_attendees option:last').val());
    for (i = 1; i <= max; i++) {
        $("#attendee_" + i + "_wrap").hide();
        document.getElementById("name_attendee_" + i).value = "";
    }
    $("#step1_result").hide();
}
//all step 2
function hideAllStep2() {
    $('#containerStep2').attr('disabled', true);
    $("#company_name_wrap").hide();
    $("#special_accommodations_wrap").hide();
    $("#step2_result").hide();
}
//all step 3 
function hideAllStep3() {
    $('#containerStep3').attr('disabled', true);
    
    if(! $('#rock').is(":checked"))
        $('#submit_button').attr('disabled', true);    
}
//verify the input text can show
$(document).on('change', '#num_attendees', function () {
    if (this.value > 0) {
        hideAllStep1();
        k = parseInt(this.value);
        for (i = 1; i <= k; i++) {
            $("#attendee_" + i + "_wrap").toggle("slow");
        }
    }
    else {
        for (i = 1; i <= k; i++) {
            $("#attendee_" + i + "_wrap").toggle("slow");
        }
        $('#step1_result').hide();
        $('#containerStep2').attr('disabled', true);
    }

});
//verify if all input (step 1) based on global variable k 
function verifyAllInputStep1() {
    var ok = true;
    for (i = 1; i <= k; i++) {
        if (document.getElementById("name_attendee_" + i).value == "") { ok = false; }
    }
    return ok;
}
function verifyInputStep1(el) {
    if (el.value.length >= 1 && verifyAllInputStep1()) {
        $('#step1_result').show("slide", { direction: "up" }, 1000);
        $('#containerStep2').attr('disabled', false);
    }
    else {
        $('#step1_result').hide("slide", { direction: "up" }, 1000);
        $('#containerStep2').attr('disabled', true);
    }
}

//verify radio button step 2
function verifyRadioStep2_1(el) {
    if (el.value == "yes") {
        $("#company_name_wrap").show("slow");
    } else {
        $("#company_name_wrap").hide("slow");
    }
    verifyAllInputStep2();
}
function verifyRadioStep2_2(el) {
    if (el.value == "yes") {
        $("#special_accommodations_wrap").show("slow");
    } else {
        $("#special_accommodations_wrap").hide("slow");
    }
    verifyAllInputStep2();
}

//verify if possible to going step 3
function verifyAllInputStep2() {
    var ok = true;
    console.log($('input[name="company_name_toggle_group"]:checked').val());
    console.log($('input[name="special_accommodations_toggle"]:checked').val());
    if (
        $('input[name="company_name_toggle_group"]:checked').val() == undefined
        ||
        $('input[name="special_accommodations_toggle"]:checked').val() == undefined
    ) {
        ok = false;
    }

    if (
        $('input[name="company_name_toggle_group"]:checked').val() == 'yes'
        &&
        (document.getElementById('company_name').value) == ""
    ) {
        ok = false;
    }

    if (
        $('input[name="special_accommodations_toggle"]:checked').val() == 'yes'
        &&
        (document.getElementById('special_accomodations_text').value) == ""
    ) {
        ok = false;
    }

    if (
        $('input[name="company_name_toggle_group"]:checked').val() == 'no'
        &&
        $('input[name="special_accommodations_toggle"]:checked').val() == 'no'
    ) {
        ok = true;
    }

    if (ok) {
        $('#containerStep3').attr('disabled', false);
        $('#step2_result').show("slide", { direction: "up" }, 1000);
    } else {
        hideAllStep3();
        $('#step2_result').hide("slide", { direction: "up" }, 1000);
    }
}
//verifico last check
$(document).on('change', '#rock', function () {
    console.log('check');
    if($(this).is(":checked")){
        $('#submit_button').attr('disabled', false);
    }
    else{
        $('#submit_button').attr('disabled', true);
    }
});