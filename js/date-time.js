class DateTime {
    constructor() {
        this._localStorage = window.localStorage;
        this._sidebarClock = document.querySelector('#user-profile-clock');
        this._sidebarDate = document.querySelector('#user-profile-date');
        this._greeterMessage = document.querySelector('#greeter-message');
        this._greeterClock = document.querySelector('#greeter-clock');
        this._greeterDate = document.querySelector('#greeter-date');
        this._setTime = this._setTime.bind(this);
        this._twentyFourMode = false;
        this._clockUpdater = null;
        this._monthsArr = [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
        ];

        this._daysArr = [
            '周日',
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六'
        ];
        //Define a set of array to display day of the month in Chinese.This can be optimized.By spliting numbers and output in a faster way.
        //Do NOT CODE LIKE THIS. IT'S A PIECE OF SH$T
        this._daysOfMonthsArr = [
            '一',
            '二',
            '三',
            '四',
            '五',
            '六',
            '七',
            '八',
            '九',
            '十',
            '十一',
            '十二',
            '十三',
            '十四',
            '十五',
            '十六',
            '十七',
            '十八',
            '十九',
            '二十',
            '二十一',
            '二十二',
            '二十三',
            '二十四',
            '二十五',
            '二十六',
            '二十七',
            '二十八',
            '二十九',
            '三十',
            '三十一',
        ];

        this._init();
    }

    //Commenting it out due to Difference locale between China and Western
    _getDayOrdinal(day) {
        // Commenting it out due to days won't smaller than 0 and won't be bigger than 31.
        //return day + (day > 0 ? [''][(day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10] : '');
        return day;
    }

    // Append zero
    _appendZero(k) {
        // Append 0 before time elements if less hour's than 10
        if (k < 10) {
            return '0' + k;
        } else {
            return k;
        }
    }

    _setTime() {
        const date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let midDay = null;
        let greeterSuffix = null;
        min = this._appendZero(min);

        if (hour >= 6 && hour < 12) {
            greeterSuffix = '上午';
        } else if (hour >= 12 && hour < 18) {
            greeterSuffix = '下午';
        } else {
            greeterSuffix = '晚上';
        }

        // 24-hour mode
        if (this._twentyFourMode === true) {
            hour = this._appendZero(hour);
            this._sidebarClock.innerText = `${hour}:${min}`;
            this._greeterClock.innerText = `${hour}:${min}`;
        } else {
            // 12-hour mode
            midDay = (hour >= 12) ? '下午' : '上午';
            hour = (hour === 0) ? 12 : ((hour > 12) ? this._appendZero(hour - 12) : this._appendZero(hour));
            this._sidebarClock.innerText = `${midDay}${hour}:${min}`;
            this._greeterClock.innerText = ` ${midDay}${hour}:${min}`;
        }
        //for debugging purposes
        //console.log(date.getDate());
        this._sidebarDate.innerText = `${date.getFullYear()}年${this._monthsArr[date.getMonth()]}${this._daysOfMonthsArr[(this._getDayOrdinal(date.getDate()-1))]}日`;
        //original
        //this._greeterDate.innerText = `${this._monthsArr[date.getMonth()]}${this._getDayOrdinal(this._appendZero(date.getDate()))} 号 ` +
        //	`, ${this._daysArr[date.getDay()]}`;
        this._greeterDate.innerText = `${this._monthsArr[date.getMonth()]}${this._daysOfMonthsArr[(this._getDayOrdinal(date.getDate()-1))]}日 ` +
            `, ${this._daysArr[date.getDay()]}`;
        //used for display current day of the month. Commented out.
        //console.log("Current date is "+ date.getDate())
        this._greeterMessage.innerText = `${greeterSuffix}好!`;
    }

    _startClock() {
        this._setTime();
        this._clockUpdater = setInterval(this._setTime, 1000);
    }

    _updateClockMode() {
        clearInterval(this._clockUpdater);
        this._twentyFourMode = !this._twentyFourMode;
        this._localStorage.setItem('twentyFourMode', JSON.stringify(this._twentyFourMode));
        this._startClock();
    }

    _clockClickEvent() {
        this._greeterClock.addEventListener(
            'click',
            () => {
                console.log('toggle 24-hour clock mode');
                this._updateClockMode();
            }
        );
        this._sidebarClock.addEventListener(
            'click',
            () => {
                console.log('toggle 24-hour clock mode');
                this._updateClockMode();
            }
        );
    }

    _init() {
        this._twentyFourMode = JSON.parse(this._localStorage.getItem('twentyFourMode')) || false;
        this._startClock();
        this._clockClickEvent();
    }
}