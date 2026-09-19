
var notation = 1;



function nd(a) {
	return new Decimal(a);
}


function format3(num) {
	if (num < 10) {
		return Math.round(num*100)/100;
	}
	else if (num < 100) {
		return Math.round(num*10)/10;
	}
	else {
		return Math.round(num);
	}
}

function nullify(num) {
	if (num < 10) {
		return "00" + Math.floor(num);
	}
	else if (num < 100) {
		return "0" + Math.floor(num);
	}
	else {
		return Math.floor(num);
	}
}


function format(num) {
	if (notation == 1) {
		return format2(num);
	}
	else {
		if (num.lt(1000)) {
			return format3(num.toNumber());
		}
		else if (num.lt(100000)) {
			var num_ = num.toNumber;
			var fPart = Math.floor(num/1000);
			var sPart = (num%1000);
			return fPart + "," + nullify(sPart);
		}
		else {
			return format_short(num);
		}
	}
}

function format0(num) {
	if (notation == 1) {
		if (num.lt(1000)) {
			return format2(num.floor());
		}
		else {
			return format2(num);
		}
	}
}


function format2(num) {
	if (num.lt(1000)) {
		return format3(num.toNumber());
	}
	else if (num.lt(100000)) {
		var num_ = num.toNumber;
		var fPart = Math.floor(num/1000);
		var sPart = (num%1000);
		return fPart + "," + nullify(sPart);
	}
	else if (num.lt(1e6)) {
		return format3(num.div(1e3).toNumber()) + " K";
	}
	else if (num.lt(1e9)) {
		return format3(num.div(1e6).toNumber()) + " M";
	}
	else if (num.lt(1e12)) {
		return format3(num.div(1e9).toNumber()) + " B";
	}
	else if (num.lt(1e15)) {
		return format3(num.div(1e12).toNumber()) + " T";
	}
	else if (num.lt(1e18)) {
		return format3(num.div(1e15).toNumber()) + " Qa";
	}
	else if (num.lt(1e21)) {
		return format3(num.div(1e18).toNumber()) + " Qi";
	}
	else if (num.lt(1e24)) {
		return format3(num.div(1e21).toNumber()) + " Sx";
	}
	else if (num.lt(1e27)) {
		return format3(num.div(1e24).toNumber()) + " Sp";
	}
	else if (num.lt(1e30)) {
		return format3(num.div(1e27).toNumber()) + " Oc";
	}
	else if (num.lt(1e33)) {
		return format3(num.div(1e30).toNumber()) + " No";
	}
	else if (num.lt(1e36)) {
		return format3(num.div(1e33).toNumber()) + " Dc";
	}
	else if (num.lt(1e39)) {
		return format3(num.div(1e36).toNumber()) + " UD";
	}
	else if (num.lt(1e42)) {
		return format3(num.div(1e39).toNumber()) + " DD";
	}
	else if (num.lt(1e45)) {
		return format3(num.div(1e42).toNumber()) + " TD";
	}
	else if (num.lt(1e48)) {
		return format3(num.div(1e45).toNumber()) + " qD";
	}
	else if (num.lt(1e51)) {
		return format3(num.div(1e48).toNumber()) + " QD";
	}
	else if (num.lt(1e54)) {
		return format3(num.div(1e51).toNumber()) + " sD";
	}
	else if (num.lt(1e57)) {
		return format3(num.div(1e54).toNumber()) + " SD";
	}
	else if (num.lt(1e60)) {
		return format3(num.div(1e57).toNumber()) + " OD";
	}
	else if (num.lt(1e63)) {
		return format3(num.div(1e60).toNumber()) + " ND";
	}
	else if (num.lt(1e66)) {
		return format3(num.div(1e63).toNumber()) + " Vg";
	}
	else if (num.lt(1e69)) {
		return format3(num.div(1e66).toNumber()) + " UV";
	}
	else if (num.lt(1e72)) {
		return format3(num.div(1e69).toNumber()) + " DV";
	}
	else if (num.lt(1e75)) {
		return format3(num.div(1e72).toNumber()) + " TV";
	}
	else if (num.lt(1e78)) {
		return format3(num.div(1e75).toNumber()) + " qV";
	}
	else if (num.lt(1e81)) {
		return format3(num.div(1e78).toNumber()) + " QV";
	}
	else if (num.lt(1e84)) {
		return format3(num.div(1e81).toNumber()) + " sV";
	}
	else if (num.lt(1e87)) {
		return format3(num.div(1e84).toNumber()) + " SV";
	}
	else if (num.lt(1e90)) {
		return format3(num.div(1e87).toNumber()) + " OV";
	}
	else if (num.lt(1e93)) {
		return format3(num.div(1e90).toNumber()) + " NV";
	}
	else if (num.lt(1e96)) {
		return format3(num.div(1e93).toNumber()) + " Tg";
	}
	else if (num.lt(1e99)) {
		return format3(num.div(1e96).toNumber()) + " UT";
	}
	else if (num.lt(1e100)) {
		return format3(num.div(1e99).toNumber()) + " DT";
	}
	else if (num.lt(1e103)) {
		return format3(num.div(1e100).toNumber()) + " G";
	}
	else {
		return format_short(num);
	}
}


var curInf = new Decimal("ee30800");


function exponentialFormat(num, precision) {
	let e = num.log10().floor()
	let m = num.div(Decimal.pow(10, e))
	if(m.toStringWithDecimalPlaces(precision) == 10) {
		m = new Decimal(1)
		e = e.add(1)
	}
	return m.toStringWithDecimalPlaces(precision)+"e"+e.toStringWithDecimalPlaces(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function exponentialFormat2(num, precision) {
	let e = num.log10();
	let e2 = e.log10().floor();
	let m = e.div(Decimal.pow(10, e2));

	return "e"+m.toStringWithDecimalPlaces(precision)+"e"+e2.toStringWithDecimalPlaces(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function commaFormat(num, precision) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function regularFormat(num, precision) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
	return x || new Decimal(y)
}

function sumValues(x) {
	x = Object.values(x)
	if (!x[0]) return new Decimal(0)
	return x.reduce((a, b) => Decimal.add(a, b))
}


function format_short(decimal, precision=1) {
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign)||isNaN(decimal.layer)||isNaN(decimal.mag)) {
		return "NaN"
	}
	if (decimal.sign<0) return "-"+format(decimal.neg(), precision)
	if (decimal.mag == Number.POSITIVE_INFINITY) return "R_INF";
	if (!decimal.gte("ee1000000")) {
		if (decimal.gte(curInf)) {
			var slog = decimal.slog()
			if (slog.gte(1e6)) return "F" + format(slog.floor())
			else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
		} else if (decimal.gte("1e1e6")) return exponentialFormat2(decimal, 3)
		else if (decimal.gte(1e4)) return exponentialFormat(decimal, 2)
		else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
		else return regularFormat(decimal, precision)
	}
	else return "INF";
}

function formatWhole(decimal) {
	decimal = new Decimal(decimal)
	if (decimal.gte(1e9)) return format(decimal, 2)
	if (decimal.lte(0.95) && !decimal.eq(0)) return format(decimal, 2)
	return format(decimal, 0)
}

function formatTime(s) {
	if (s<60) return format(s)+"s"
	else if (s<3600) return formatWhole(Math.floor(s/60))+"m "+format(s%60)+"s"
	else if (s<86400) return formatWhole(Math.floor(s/3600))+"h "+formatWhole(Math.floor(s/60)%60)+"m "+format(s%60)+"s"
	else return formatWhole(Math.floor(s/86400)) + "d "+formatWhole(Math.floor(s/3600)%24)+"h "+formatWhole(Math.floor(s/60)%60)+"m "+format(s%60)+"s"
}

function toPlaces(x, precision, maxAccepted) {
	x = new Decimal(x)
	let result = x.toStringWithDecimalPlaces(precision)
	if (new Decimal(result).gte(maxAccepted)) {
		result = new Decimal(maxAccepted-Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
	}
	return result
}

function absmin(a, b) {
	if (Math.abs(a) < Math.abs(b)) {
		return a;
	}
	else {
		return b;
	}
}

var mousePosX = 0;
var mousePosY = 0;


this.addEventListener("tick", main_fs.bind(this));
function main_fs() {

	mousePosX = stage.mouseX / canvas.width * 1280;
	mousePosY = stage.mouseY / canvas.height * 720;
}