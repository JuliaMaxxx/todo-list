function newListElement(){
  var inputValue = document.getElementById("myInput").value;
  //Создаем динамически новый элемент списка
  var li = document.createElement('li');
  //Create checkbox dynamically       
  var cb = document.createElement( "input" );
  cb.type = "checkbox";
  cb.onchange = changeStatus;
  cb.value = inputValue;
  cb.checked = false;
  //Append the checkbox to the li
  li.appendChild(cb);
  //Create the text node after the the checkbox
  var text = document.createElement("span");
      text.innerText = inputValue;
  //Append the text node to the <li>
      li.appendChild(text);
      li.className = "c1";
  //Append the <li> to the <ul>
  var ul = document.getElementById("myList");
  if (inputValue === '') {
      alert("You must write something!");
    } else {    
      ul.appendChild(li);
    }
  document.getElementById("myInput").value = ""; 
}

    
function changeStatus(event) {
    var cb = event.target;
    if (cb.checked == true) {
        var line = cb.parentElement;
        console.log(line);
        var ul = document.getElementById("myList");
        ul.removeChild(line);

        //Creat a new li at the end of list
        line.className = "c2";
        ul.appendChild(line);
              
    } else {
        var line = cb.parentElement;
        console.log(line);
        var ul = document.getElementById("myList");
        ul.removeChild(line);

        //Creat a new li at the bigining of the list
        line.className = "c1";
        ul.insertBefore(line, ul.firstChild);        
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if( ev.target.tagName === 'LI') {
    ev.target.classList.toggle('done');
  }
}, false);

// @ts-check
'use strict';

/**
 * Возвращает перечень дат для месяца
 * @param {number} year Год
 * @param {number} month Месяц (1-12)
 */
function getMonthDates( year, month )
{
	const lastPrevDate = new Date( year, month - 1, 0 ).getDate();
	const lastCurDate = new Date( year, month, 0 ).getDate();
	const firstDayOfWeek = getDayOfWeek(new Date( year, month - 1, 1 ));
	const startFromPrevMonth = firstDayOfWeek !== 1;
	const fromDate = startFromPrevMonth
		? lastPrevDate - firstDayOfWeek + 2
		: 1;
	
	const daysBeforeLastInMonth = lastCurDate + firstDayOfWeek - 1;
	// const daysFromNextMonth = 7 - (daysBeforeLastInMonth % 7);
	
	const weeksInMonth = Math.ceil(daysBeforeLastInMonth / 7);
	
	/** @type {'prev' | 'current' | 'next'} */
	let monthType = startFromPrevMonth ? 'prev' : 'current';
	/** @type {number} */
	let date = fromDate - 1;
	
	/** @type {Date[]} */
	const dates = [];
	
	for ( let i = 0; i < weeksInMonth * 7; i++ )
	{
		date++;
		
		/** @type {number} */
		let monthAddition;
		
		switch ( monthType )
		{
			case 'prev':
				monthAddition = -1;
				
				if ( date > lastPrevDate )
				{
					date = 1;
					monthType = 'current';
					monthAddition = 0;
				}
				break;
			
			case 'current':
				monthAddition = 0;
				
				if ( date > lastCurDate )
				{
					date = 1;
					monthType = 'next';
					monthAddition = 1;
				}
				break;
			
			default:
				monthAddition = 1;
				break;
		}
		
		const newDate = new Date( year, month + monthAddition - 1, date );
		
		dates.push( newDate );
	}
	
	return dates;
}

/**
 * Возвращает день недели 1-7, с понедельника
 * @param {Date} date Дата
 */
function getDayOfWeek( date )
{
	let day = date.getDay();
	
	if (day === 0)
	{
		day = 7;
	}
	
	return day;
}

/**
 * Создаёт разметку ячейки календаря
 * @param {Date} todayDate Текущая дата
 * @param {number} selectedMonth Выбранный месяц (1-12)
 * @param {Date} itemDate Дата ячейки календаря
 */
function createCalendarItem( todayDate, selectedMonth, itemDate )
{
	/** @type {string[]} */
	const classNames = [];
	
	if ( selectedMonth - 1 !== itemDate.getMonth() )
	{
		classNames.push( 'other-month' );
	}
	
	if (
		( todayDate.getFullYear() === itemDate.getFullYear() )
		&& ( todayDate.getMonth() === itemDate.getMonth() )
		&& ( todayDate.getDate() === itemDate.getDate() )
	)
	{
		classNames.push( 'today' );
	}
	
	return /* html */`
		<li class="${classNames.join( ' ' )}" data-date="${itemDate.toISOString()}" tabindex="0" role="button">
			${itemDate.getDate()}
		</li>
	`;
}

// console.log( dates.map( date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` ) );

/**
 * Обрабатывает нажатие на дату календаря
 * @param {MouseEvent} event Событие нажатия
 */
function handleCalendarDatesClick( event )
{
	/** @type {HTMLLIElement} */
	const item = event.target.closest( 'li' );
	const date = new Date( item.dataset.date );
}

/**
 * Обрабатывает нажатие с клавиатуры на дату календаря
 * @param {KeyboardEvent} event Событие нажатия
 */
function handleCalendarDatesKeyUp( event )
{
	if (
		( event.key !== 'Enter' )
		&& ( event.key !== ' ' )
	)
	{
		return;
	}
	
	/** @type {HTMLLIElement} */
	const item = event.target.closest( 'li' );
	const date = new Date( item.dataset.date );
}

function main()
{
	const calendarElement = document.querySelector( 'ul.calendar-dates' );
	
	calendarElement.addEventListener( 'click', handleCalendarDatesClick );
	calendarElement.addEventListener( 'keyup', handleCalendarDatesKeyUp );
	
	const calendarYear = 2021;
	const calendarMonth = 12;
	const today = new Date();
	const dates = getMonthDates( calendarYear, calendarMonth );
	const html = dates
		.map(
			( date ) => createCalendarItem( today, calendarMonth, date ),
		)
		.join( '' );
	
	calendarElement.innerHTML = html;
}

main();