/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?


const FULL_DAY_RATE = 35;
const HALF_DAY_RATE = 20;

let selectedDays = [];    // using array instead of dayCounter
let currentRate = 'full'; // init to full

/* global $ */
$(function () {

  /********* colour change days of week *********/
  // when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
  // added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

  $('.day-selector li').on('click', function () {
    let dayId = $(this).attr('id');
    $(this).toggleClass('clicked');

    if ($(this).hasClass('clicked')) {
      selectedDays.push(dayId);
    } else {
      selectedDays = selectedDays.filter(function (d) {
        return d !== dayId;
      });
    }

    calculateTotal();
  });

  /********* change rate *********/
  // when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

  rateToggle('#half', 'half');

  // when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

  rateToggle('#full', 'full');

  /********* clear days *********/
  // when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

  $('#clear-button').on('click', function () {
    $('.day-selector li').removeClass('clicked');
    selectedDays = [];
    switchRate('full'); // toggle to full
    updateTotalCost();
  });
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function switchRate(rate) {
  currentRate = rate;

  if (rate === 'full') {
    $('#full').addClass('clicked');
    $('#half').removeClass('clicked');
  } else {
    $('#half').addClass('clicked');
    $('#full').removeClass('clicked');
  }

  calculateTotal();
}




function rateToggle(selector, rate) {
  $(selector).on('click', function () {
    if (currentRate !== rate) {
      switchRate(rate);
    }
  });
}




/**
 * calculation & render
 */
function calculateTotal() {
  let rateValue = currentRate === 'full' ? FULL_DAY_RATE : HALF_DAY_RATE;
  let total = selectedDays.length * rateValue;
  updateTotalCost(total);
}

function updateTotalCost(price) {
  $('#calculated-cost').text(price ? price : 0);
}