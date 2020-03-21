// https://developers.google.com/s/results/web/fundamentals?q=full%20screen
console.log("*");
var doc = window.document,
    _scroller = {},
    _settings = {},
    _btnSettings = doc.getElementById("btnSettings"),
    _templates = doc.getElementsByTagName("template").item(0).content,
    _monthTemplate = _templates.querySelector("div.ph-month"),
    _dayPrevTemplate = _templates.querySelector("li.month-prev"),
    _dayCurrTemplate = _templates.querySelector("li.month-curr"),
    _scrollerDiv = doc.querySelector("div.ph-scroller-wrapper"),
    _shift;

const FIRSTDAYOFWEEK = 1;
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _DATE_ZERO = new Date(2013, 0, 21);

//
//
// utils:
const _dateAdd = (date, delta) => {
    date.setDate(date.getDate() + delta);
};

//
//
// utils:
const _debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay);
    };
};

//
//
// a and b are javascript Date objects
const _dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

//
//
//
function MonthScroller(date) {

    // const
    const RUN_OFF = 12;

    this.updateShift = () => {
        _scrollerDiv.childNodes.forEach(monthEl => {
            let date = new Date();
            let month = date.setTime(monthEl.dataset.date);
            console.log(month);

            monthEl.querySelectorAll(".month-curr").forEach((dayEl, index) => {

                // first remove old
                dayEl.classList.forEach(className => {
                    className.startsWith("shift-") && dayEl.classList.remove(className);
                });

                date.setDate(index + 1);

                // update with current shift class
                dayEl.classList.add(this.getClassFromDay(date));
            });
        });
    };

    //
    //
    //
    this.getClassFromDay = (date) => {

        let timeDiff = (date - _DATE_ZERO);
        if (timeDiff < 0) {
            return _UNKNOWN_SHIFT;
        }

        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // more correct way:
        // let daysDiff = _dateDiffInDays(day, _DATE_ZERO);

        // is it days or nights
        let ndShiftsModulo = daysDiff % (7 * 8);

        switch (_shift) {
            case "shift-A":
                return shift.A[ndShiftsModulo] || _UNKNOWN_SHIFT;
            case "shift-B":
                return shift.B[ndShiftsModulo] || _UNKNOWN_SHIFT;
            case "shift-C":
                return shift.C[ndShiftsModulo] || _UNKNOWN_SHIFT;
            case "shift-D":
                return shift.D[ndShiftsModulo] || _UNKNOWN_SHIFT;
        }

        return _UNKNOWN_SHIFT;
    };

    //
    //
    //
    this.getMonthFragment = (month) => {

        const monthEl = _monthTemplate.cloneNode(true);
        monthEl.dataset.date = month.getTime();

        let _getDays = (month) => {
            if (month === undefined || FIRSTDAYOFWEEK === undefined) {
                return;
            }
            // First day of the month (at midnight).
            var date = new Date(0, 0);
            date.setFullYear(month.getFullYear());
            date.setMonth(month.getMonth());
            date.setDate(1);

            // Rewind to first day of the week.
            while (date.getDay() !== FIRSTDAYOFWEEK) {
                _dateAdd(date, -1);
            }

            var days = [];
            var startMonth = date.getMonth();
            var targetMonth = month.getMonth();
            while (date.getMonth() === targetMonth || date.getMonth() === startMonth) {
                days.push(date.getMonth() === targetMonth ? new Date(date.getTime()) : null);

                // Advance to next day.
                _dateAdd(date, 1);
            }
            return days;
        };

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
        const yearAndMonth = month.toLocaleString("default", { month: "long", year: "numeric" });
        monthEl.getElementsByTagName("header")[0].innerText = yearAndMonth;

        const days = _getDays(month);
        const daysTemplate = monthEl.querySelector("ul.day-grid");

        let dayTemplate;
        days.forEach((day) => {
            if (day) {
                dayTemplate = _dayCurrTemplate.cloneNode(true);
                dayTemplate.innerText = day.getDate();
                dayTemplate.classList.add(this.getClassFromDay(day));
            } else {
                dayTemplate = _dayPrevTemplate.cloneNode(true);
            }
            daysTemplate.appendChild(dayTemplate);
        });

        return monthEl;
    };

    //
    //
    //
    this.initMonthTemplate = () => {

        var date = new Date(0, 0);
        // Rewind to first day of the week.
        while (date.getDay() !== FIRSTDAYOFWEEK) {
            _dateAdd(date, -1);
        }

        let dayNamesNodes = _templates.querySelectorAll("ul.weekdays >li");

        let name = "";
        dayNamesNodes.forEach((dayNode) => {
            let dayName = dayNode.children;
            name = date.toLocaleString("default", { weekday: "long" });
            dayName[2].innerText = name;
            name = date.toLocaleString("default", { weekday: "short" });
            dayName[1].innerText = name;
            dayName[0].innerText = name[0];
            _dateAdd(date, 1);
        });
    };

    //
    //
    //
    this.scrollUpdate = () => {

        let topRect = _scrollerDiv.firstElementChild.getBoundingClientRect();
        let bottomRect = _scrollerDiv.lastElementChild.getBoundingClientRect();
        let contextRect = _scrollerDiv.parentElement.getBoundingClientRect();
        let scrollPosTop = contextRect.top - topRect.top;
        let scrollPosBottom = bottomRect.bottom - contextRect.bottom;
        let elHight = (topRect.height + bottomRect.height) / 2;

        // add element
        if (scrollPosTop / elHight < RUN_OFF) {

            let date = new Date();
            date.setTime(_scrollerDiv.firstElementChild.dataset.date);

            let el = this.getMonthFragment(new Date(date.setMonth(date.getMonth() - 1)));
            _scrollerDiv.insertBefore(el, _scrollerDiv.firstElementChild);

        } else if (scrollPosBottom / elHight < RUN_OFF) {

            let date = new Date();
            date.setTime(_scrollerDiv.lastElementChild.dataset.date);

            let el = this.getMonthFragment(new Date(date.setMonth(date.getMonth() + 1)));
            _scrollerDiv.appendChild(el);
        }

        // this.scrollUpdateDebounce();
    };


    //
    //
    // TODO: remove excessive elements
    this.scrollUpdateDebounce = _debounce(() => console.log("debounced"), 100);

    //
    //
    //
    this.initLayout = (date) => {

        // First day of the month (at midnight).
        // some strange things can happen if we stuck with 31 day of the month
        var date1st = new Date(0, 0);
        date1st.setFullYear(date.getFullYear());
        date1st.setMonth(date.getMonth());
        date1st.setDate(1);

        // starting element
        let el1st = this.getMonthFragment(date1st);
        _scrollerDiv.appendChild(el1st);

        // now add elements in both side
        let topRect, bottomRect, scrollInsideHeight;
        let contextRect = _scrollerDiv.parentElement.getBoundingClientRect();
        let monthShift = 0;
        do {
            monthShift++;
            let el = this.getMonthFragment(new Date(date1st.getFullYear(), date1st.getMonth() + monthShift), 1);
            _scrollerDiv.appendChild(el);
            el = this.getMonthFragment(new Date(date1st.getFullYear(), date1st.getMonth() - monthShift), 1);
            _scrollerDiv.insertBefore(el, _scrollerDiv.firstElementChild);

            topRect = _scrollerDiv.firstElementChild.getBoundingClientRect();
            bottomRect = _scrollerDiv.lastElementChild.getBoundingClientRect();
            scrollInsideHeight = bottomRect.bottom - topRect.top;
        }
        while ((scrollInsideHeight / contextRect.height) < (2 * RUN_OFF + 1));

        // move to date to center
        el1st.scrollIntoView();

        // save offset
        this._offset = -el1st.offsetTop;
    };

    // On resize
    this.resize = () => {
        console.log("Scroller resize");
    };

    // init month template with week days
    this.initMonthTemplate();

    // init layout
    this.initLayout(date);

    // scroll events
    _scrollerDiv.parentNode.onscroll = this.scrollUpdate;
}

//
//
//
function SettingsModal() {

    // Gloabl state variables
    const STATE_CLOSED = 1;
    const STATE_OPEN = 2;
    let currentState = STATE_CLOSED;

    this.click = (ev) => {
        console.log("settings click:", ev);

        switch (currentState) {
            case STATE_CLOSED:
                currentState = STATE_OPEN;
                break;
            case STATE_OPEN:
                currentState = STATE_CLOSED;
                break;

            default:
                currentState = STATE_CLOSED;
                break;
        }

        this.updateState();
    };

    this.updateState = () => {
        switch (currentState) {
            case STATE_OPEN:
                obfuscator.classList.add("is-visible");
                modal.style.display = "flex";
                break;
            default:
                obfuscator.classList.remove("is-visible");
                modal.style.display = "none";
                break;
        }
    };

    this.resize = () => {
        currentState = STATE_CLOSED;
        this.updateState();
    };

    function inputClick(ev) {
        // cancel other inputs
        inputs.forEach(element => {
            if (element !== ev.target) {
                element.parentElement.MaterialCheckbox.uncheck();
            }
        });
        // save selection
        localStorage.setItem("shift", ev.target.id);
    }

    function inputInit() {
        // save selection
        let shiftId = localStorage.getItem("shift");
        inputs.forEach(element => {
            if (element.id === shiftId) {
                element.parentElement.MaterialCheckbox.check();
            }
        });
    }

    // obfuscator
    let obfuscator = doc.querySelector("div.mdl-layout__obfuscator");
    obfuscator.addEventListener("click", this.click);
    // modal
    let modal = doc.getElementById("modalSettings");
    // inputs
    let inputs = modal.querySelectorAll(".settings-list-control input");
    inputs.forEach(element => element.onclick = inputClick);
    inputInit();
}

//
//
//
function init() {

    // init shift
    let shift = localStorage.getItem("shift");
    if (!shift) {
        localStorage.setItem("shift", "shift-C");
    }
    _shift = localStorage.getItem("shift");

    console.log(_shift);

    // init callendar
    _scroller = new MonthScroller(new Date());

    // init settings modal
    _settings = new SettingsModal();
    _btnSettings.addEventListener("click", _settings.click);

    resize();
}

//
//
//
function resize() {
    _settings.resize();
    _scroller.resize();
}

window.onload = init;
window.onresize = resize;