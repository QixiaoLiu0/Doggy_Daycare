/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?




/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!





/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.






/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.




// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.





/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value



const FULL_DAY_RATE = 40;
const HALF_DAY_RATE = 20;

let selectedDays = [];
let currentRate = 'half'; // init to half

$(() => {
  // date has been clicked
  $('.day-selector li').on('click', function () {
    const dayId = $(this).attr('id');
    $(this).toggleClass('clicked');

    if ($(this).hasClass('clicked')) {
      selectedDays.push(dayId);
    } else {
      selectedDays = selectedDays.filter(d => d !== dayId);
    }

    calculateTotal();
  });

  // half-day 
  $('#half').on('click', function () {
    if (currentRate !== 'half') {
      switchRate('half');
    }
  });

  // full-day 
  $('#full').on('click', function () {
    if (currentRate !== 'full') {
      switchRate('full');
    }
  });

  // clear btn
  $('#clear-button').on('click', () => {
    $('.day-selector li').removeClass('clicked');
    selectedDays = [];

    switchRate('half'); // toggle to half
    updateTotalCost(0);
  });
});


const switchRate = rate => {
  currentRate = rate;

  rate === 'full'
    ? ($('#full').addClass('clicked'), $('#half').removeClass('clicked'))
    : ($('#half').addClass('clicked'), $('#full').removeClass('clicked'));

  calculateTotal();
};

// calculate total price
const calculateTotal = () => {
  const rateValue = currentRate === 'full' ? FULL_DAY_RATE : HALF_DAY_RATE;
  const total = selectedDays.length * rateValue;
  updateTotalCost(total);
};

// render
const updateTotalCost = amount => {
  $('#calculated-cost').text(`$${amount}`);
};