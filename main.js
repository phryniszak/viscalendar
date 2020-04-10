// https://developers.google.com/s/results/web/fundamentals?q=full%20screen
console.log("*");
var doc = window.document,
    _scroller = {},
    _modShift = {},
    _modAbout = {},
    _templates = doc.getElementsByTagName("template").item(0).content,
    _monthTemplate = _templates.querySelector("div.ph-month"),
    _dayPrevTemplate = _templates.querySelector("li.month-prev"),
    _dayCurrTemplate = _templates.querySelector("li.month-curr"),
    _scrollerDiv = doc.querySelector("div.ph-scroller-wrapper"),
    _obfuscator = doc.querySelector("div.mdl-layout__obfuscator"),
    _shift,
    _browserLaunched = true;


const FIRSTDAYOFWEEK = 1;
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _DATE_ZERO = Date.UTC(2005, 9, 10);
const _DEBUG = false;

//
//
// utils:
function _dateAdd(date, delta) {
    date.setDate(date.getDate() + delta);
}

//
//
// a and b are javascript Date objects
function _dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

//
//
// a and b are javascript Date objects
function _dateDiffInDays2zero (a) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    return Math.floor((utc1 - _DATE_ZERO) / _MS_PER_DAY);
}

//
//
//
function MonthScroller(date) {

    this.el1st = null;

    // const
    const RUN_OFF = 12;

    //
    //
    //
    this.home = () => {
        this.el1st.scrollIntoView();
    };

    //
    //
    //
    this.updateShift = () => {
        _scrollerDiv.childNodes.forEach(monthEl => {
            let date = new Date();
            date.setTime(monthEl.dataset.date);

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

        let daysDiff = _dateDiffInDays2zero(date);
        if (daysDiff < 0) {
            return _UNKNOWN_SHIFT;
        }

        // shifts modulo pattern index
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
    // Only for info purpose
    this.getDayModulo = (date) => {

        let daysDiff = _dateDiffInDays2zero(date);
        if (daysDiff < 0) {
            return _UNKNOWN_SHIFT;
        }

        // is it days or nights
        let ndShiftsModulo = daysDiff % (7 * 8);
        return "modulo-" + ndShiftsModulo;
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
                if (_DEBUG) {
                    dayTemplate.classList.add(this.getDayModulo(day));
                }
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

        var date = new Date(_DATE_ZERO);

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
    //
    this.initLayout = (date) => {

        let currDate = date.getDate();

        // First day of the month (at midnight).
        // some strange things can happen if we stuck with 31 day of the month
        var date1st = new Date(0, 0);
        date1st.setFullYear(date.getFullYear());
        date1st.setMonth(date.getMonth());
        date1st.setDate(1);

        // starting element
        this.el1st = this.getMonthFragment(date1st);
        _scrollerDiv.appendChild(this.el1st);
        // set current day
        this.el1st.querySelectorAll(".month-curr")[currDate - 1].classList.add("today");

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
        this.el1st.scrollIntoView();

        // save offset
        this._offset = -this.el1st.offsetTop;
    };

    // On resize
    this.resize = () => {
        if (_DEBUG)
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
function ShiftModal() {

    // Gloabl state variables
    const STATE_CLOSED = 1;
    const STATE_OPEN = 2;
    let currentState = STATE_CLOSED;

    this.open = () => {
        currentState = STATE_OPEN;
        this.updateState();
    };

    this.close = () => {
        currentState = STATE_CLOSED;
        this.updateState();
    };

    this.updateState = () => {
        switch (currentState) {
            case STATE_OPEN:

                // update with curren shift
                inputInit();

                // open modal
                _obfuscator.classList.add("is-visible");
                modal.style.display = "flex";
                break;
            default:

                // close modal
                _obfuscator.classList.remove("is-visible");
                modal.style.display = "none";

                // and update shift pattern
                updateShift();
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
        inputs.forEach(element => {
            if (element.id === _shift) {
                element.parentElement.MaterialCheckbox.check();
            }
        });
    }

    // modal
    let modal = doc.getElementById("modalShift");
    // inputs
    let inputs = modal.querySelectorAll(".settings-list-control input");
    inputs.forEach(element => element.onclick = inputClick);
}


//
//
//
function AboutModal() {

    // Gloabl state variables
    const STATE_CLOSED = 1;
    const STATE_OPEN = 2;
    let currentState = STATE_CLOSED;
    let timer;
    let lblTick = doc.getElementById("lblTick");
    let tickText = lblTick.innerText;
    let tickNr = 0;

    this.open = () => {
        currentState = STATE_OPEN;
        this.updateState();
    };

    this.close = () => {
        currentState = STATE_CLOSED;
        this.updateState();
    };

    this.tick = () => {
        switch (tickNr++) {
            case 1:
                lblTick.style.opacity = 1;
                lblTick.innerText = tickText;
                break;
            case 16:
                lblTick.style.opacity = 0;
                break;
            case 20:
                lblTick.style.opacity = 1;
                lblTick.innerText = `... ${_dateDiffInDays(new Date(), new Date(2024, 3, 1))} days left`;
                break;
            case 35:
                lblTick.style.opacity = 0;
                break;
            case 39:
                tickNr = 0;
                break;
        }
    };


    this.updateState = () => {
        switch (currentState) {
            case STATE_OPEN:

                // start timer
                timer = setInterval(this.tick, 100);

                if (_browserLaunched) {
                    // enable/disable install button
                    if (window.deferredPrompt)
                        doc.getElementById("btnInstall").removeAttribute("disabled");
                    else
                        doc.getElementById("btnInstall").setAttribute("disabled", "");
                } else {
                    // hide if we are launch as app
                    doc.getElementById("btnInstall").parentNode.style.display = "none";
                }

                // open modal
                _obfuscator.classList.add("is-visible");
                modal.style.display = "flex";
                break;

            case STATE_CLOSED:

                // restore to "zero" state
                clearInterval(timer);
                tickNr = 0;
                lblTick.innerText = tickText;

                // close modal
                _obfuscator.classList.remove("is-visible");
                modal.style.display = "none";
                break;
        }
    };

    this.resize = () => {
        currentState = STATE_CLOSED;
        this.updateState();
    };

    // modal
    let modal = doc.getElementById("modalAbout");
}

//
//
//
function updateShift() {
    // init shift
    let shift = localStorage.getItem("shift");
    if (!shift) {
        localStorage.setItem("shift", "shift-C");
    }
    _shift = localStorage.getItem("shift");

    // update scrollet with current shift
    _scroller.updateShift();

    // update shift label 
    let lblShift = doc.getElementById("btnShift");
    switch (_shift) {
        case "shift-A":
            lblShift.innerText = "A SHIFT";
            break;
        case "shift-B":
            lblShift.innerText = "B SHIFT";
            break;
        case "shift-C":
            lblShift.innerText = "C SHIFT";
            break;
        case "shift-D":
            lblShift.innerText = "D SHIFT";
            break;
    }
}

//
//
// https://web.dev/customize-install/#detect-mode
function installApp() {
    console.log("installApp");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then((result) => {
        console.log("userChoice", result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        // divInstall.classList.toggle("hidden", true);
    });
}

//
//
//
function init() {

    // check for launch from desktop
    if (navigator.standalone) {
        _browserLaunched = false;
        console.log("Launched: Installed (iOS)");
    } else if (matchMedia("(display-mode: standalone)").matches) {
        _browserLaunched = false;
        console.log("Launched: Installed");
    }

    // init callendar
    _scroller = new MonthScroller(new Date());
    doc.getElementById("btnHome").onclick = _scroller.home;

    // init shifts modal
    _modShift = new ShiftModal();
    doc.getElementById("btnShift").onclick = _modShift.open;

    // init about modal
    _modAbout = new AboutModal();
    doc.getElementById("btnAbout").onclick = _modAbout.open;

    // click on obfuscator to close modals
    _obfuscator.onclick = () => {
        _modShift.close();
        _modAbout.close();
    };

    // install app
    doc.getElementById("btnInstall").onclick = installApp;

    // update app with current settings
    updateShift();

    resize();
    window.onresize = resize;
}

//
//
//
function resize() {
    _modShift.resize();
    _modAbout.resize();
    _scroller.resize();
}

window.onload = init;