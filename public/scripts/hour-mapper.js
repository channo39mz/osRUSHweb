const ColorHash = require("color-hash").default;
var colorHash = new ColorHash();

class HourMapper {
    constructor() {
        this.hours = new Array(24).fill().map(e => []);
    }

    map(obj, starttime, endtime) {
        const color = colorHash.rgb(obj);
        const hourStart = parseInt(starttime.split(":")[0]);
        const hourEnd = parseInt(endtime.split(":")[0]);
        const minuteStart = parseInt(starttime.split(":")[1]) / 60;
        const minuteEnd = parseInt(endtime.split(":")[1]) / 60;
        if (hourStart == hourEnd) {
            this.hours[hourStart].push({ name: obj, color: color, base: minuteStart, limit: minuteEnd-minuteStart })
        } else {
            this.hours[hourStart].push({ name: obj, color: color, base: minuteStart, limit: 1-minuteStart })
            for (let t = hourStart+1; t < hourEnd; t++) {
                this.hours[t].push({ name: obj, color: color, base: 0, limit: 1});
            }
            if (minuteEnd > 0) {
                this.hours[hourEnd].push({ name: obj, color: color, base: 0, limit: minuteEnd })
            }
        }
    }
}

module.exports = HourMapper;