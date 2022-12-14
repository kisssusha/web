let n = 20, // количество слоев
    m = 200, // количество образцов на слой
    k = 10; // количество неровностей на слой

let stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),// .stack генератор стека
    // .keys Принимает массив строк в качестве аргумента и возвращает генератор стека.
    // .offset Принимает функцию смещения в качестве аргумента и возвращает генератор стека.
    // .stackOffsetWiggle расположите ряд таким образом, чтобы покачивание в каждом ряду было сведено к минимуму.
    layers0 = stack(d3.transpose(d3.range(n).map(function () {
        return bumps(m, k);
    }))),
    layers1 = stack(d3.transpose(d3.range(n).map(function () {
        return bumps(m, k);
    }))),
    layers = layers0.concat(layers1);

let elem = document.getElementById("elem")
let targetWidth = elem.getBoundingClientRect().width;
let targetHeight = elem.getBoundingClientRect().height;
const svgWidth = targetWidth;
const svgHeight = targetHeight;
const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
}
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

let svg = d3.select("svg").// выбор первого svg в документе
    attr("width", svgWidth).attr("height", svgHeight);


// генерация областей

let x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

let y = d3.scaleLinear()
    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
    .range([height, 0]);

let z = d3.interpolateCool;

let area = d3.area()
    .x(function (d, i) {
        return x(i);
    })
    .y0(function (d) {
        return y(d[0]);
    })
    .y1(function (d) {
        return y(d[1]);
    });

svg.selectAll("path")//сообщает браузеру найти элемент svg и поискать внутри него path
    // он возвращает данные в виде выделения, представляющего собой массив элементов.
    // Если он ничего не находит, он возвращает пустой выбор
    .data(layers0)
    .enter()
    .append("path")
    .attr("d", area)
    .attr("fill", function () {
        return z(Math.random());
    });

function stackMax(layer) {
    return d3.max(layer, function (d) {
        return d[1];
    });
}

function stackMin(layer) {
    return d3.min(layer, function (d) { //d3.min возвращает минимальное значение из заданной итерации значений.
        return d[0];
    });
}


//переход
function transition() {
    let t;
    d3.selectAll("path")  // выбор всех path в документе
        .data((t = layers1, layers1 = layers0, layers0 = t))
        .transition()
        .duration(2500)
        .attr("d", area);
}

// генератор тестовых данных Ли Байрона.
function bumps(n, m) {
    let a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < m; ++i) bump(a, n);
    return a;
}

function bump(a, n) {
    let x = 1 / (0.1 + Math.random()),
        y = 2 * Math.random() - 0.5,
        z = 10 / (0.1 + Math.random());
    for (let i = 0; i < n; i++) {
        let w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
    }
}


let chart = d3.select('#chart');
d3.select(window)
    .on("resize", function () {
        let elem = document.getElementById("elem")
        let targetWidth = elem.getBoundingClientRect().width;
        let targetHeight = elem.getBoundingClientRect().height;

        chart.attr("width", targetWidth);
        chart.attr("height", targetHeight);
        chart.attr("transform", "scale(1)")
        area.x(x(targetWidth)).y0(y(targetHeight)).y1(y(targetHeight))

        // var svg = d3.select("#chart")
        //     .select("svg")
        //     .selectAll("path")
        //     .data(layers0);
        // svg.enter()
        //     .append("svg:path")
        //     .attr('d', area)
        // svg.exit().remove();
        //
    });


