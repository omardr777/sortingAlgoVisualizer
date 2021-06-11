const contDiv = document.getElementById('container');
var genBtn = document.getElementById('genBtn');
var mergBtn = document.getElementById("mergBtn");
var quickgBtn = document.getElementById('quickgBtn');
var bubbleBtn = document.getElementById('bubbleBtn');
var insBtn = document.getElementById('insBtn');
var timeSpan = document.getElementById('timeSpan');
var compCounter = document.getElementById('compCounter');
var arr = [];
var arrHeights = [];
var amountBar = document.getElementById('amountBar');
var arrSize = amountBar.value;
var speedBar = document.getElementById('myRange');
var speed = speedBar.value;
var delay = 0; //var speedA = 100;
var delay_time;
var testing = 5000;
var maxS = 600;
var time1 = 0;
var time2 = 0;
var counter = 0;

var x = window.matchMedia("(max-width: 1080px)");
if (x.matches) {
    maxS = 200;
    console.log('done');
}


window.onload = update_array_size();

//slideBars events
amountBar.addEventListener('input', update_array_size);
speedBar.oninput = async function () {
    // speed = speedBar.value;
    // delay_time = 10000 / (Math.floor(testing / 10) * speed);
    speed = await speedBarF();
}
//bubbleBtn.disabled = true;
// btns events
genBtn.addEventListener('click', generate);
bubbleBtn.addEventListener('click', bubbleSort);
quickgBtn.addEventListener('click', startQuickSort);
insBtn.addEventListener('click', insertionSort);
mergBtn.addEventListener('click', startMergSort);


//fuctions


async function speedBarF() {
    // speed = speedBar.value;
    delay_time = 10000 / (Math.floor(testing / 10) * speed);
    return speedBar.value;
}
function generate() {
    contDiv.innerHTML = '';
    bubbleBtn.disabled = false;
    quickgBtn.disabled = false;
    insBtn.disabled = false;
    mergBtn.disabled = false;
    delay = 0;
    delay_time = 10000 / (Math.floor(testing / 10) * speed);
    arrHeights = [];
    arr = [];

    for (var i = 0; i < arrSize; i++) {
        arrHeights[i] = randomRange(5, maxS);
        arr[i] = document.createElement('div');
        contDiv.appendChild(arr[i]);
        //the style
        arr[i].style.height = `${arrHeights[i]}px`;
        arr[i].style.backgroundColor = "blue";
        //arr[i].style.width = `6px`;

    }


    // console.log(arrHeights);
    // console.log(arr);
}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function updateDiv(cDiv, height, color) {
    // console.log(cDiv);
    window.setTimeout(function () {
        cDiv.style.height = `${height}px`;
        cDiv.style.backgroundColor = color;
    }, delay += delay_time);


}
function update_array_size() {
    arrSize = amountBar.value;
    generate();
}
function sortBtnsDisable() {
    bubbleBtn.disabled = true;
    quickgBtn.disabled = true;
    insBtn.disabled = true;
    mergBtn.disabled = true;
}
function sortBtnsEnable() {
    window.setTimeout(() => {
        bubbleBtn.disabled = false;
        quickgBtn.disabled = false;
        insBtn.disabled = false;
        mergBtn.disabled = false;
    }, delay += delay_time);

}

//algos
function bubbleSort() {
    time1 = Date.now();
    sortBtnsDisable();
    delay = 0;
    counter = 0;
    compCounter.textContent = '';
    delay_time = 10000 / (Math.floor(testing / 10) * speed);
    for (let i = 0; i < arr.length - 1; i++) {
        counter++;
        for (var j = 0; j < arr.length - i - 1; j++) {

            updateDiv(arr[j], arrHeights[j], 'yellow');
            counter++;
            if (arrHeights[j] > arrHeights[j + 1]) {

                updateDiv(arr[j], arrHeights[j], 'red');
                updateDiv(arr[j + 1], arrHeights[j + 1], 'red');

                let tmep = arrHeights[j];
                arrHeights[j] = arrHeights[j + 1];
                arrHeights[j + 1] = tmep;

                updateDiv(arr[j], arrHeights[j], 'red');
                updateDiv(arr[j + 1], arrHeights[j + 1], 'red');
            }
            updateDiv(arr[j], arrHeights[j], 'blue');
        }
        updateDiv(arr[j], arrHeights[j], 'green');

    }
    updateDiv(arr[0], arrHeights[0], 'green');
    time2 = Date.now();
    timeSpan.textContent = `${(time2 - time1) / 1000}`;
    compCounter.textContent = `${counter}`;
    sortBtnsEnable();
}
function startQuickSort() {
    sortBtnsDisable();
    time1 = Date.now();
    counter = 0;
    compCounter.textContent = '';
    delay = 0;
    //delay_time = 10000 / (Math.floor(testing / 10) * speed);
    quickSort(0, arrHeights.length - 1);
    time2 = Date.now();
    timeSpan.textContent = `${(time2 - time1) / 1000}s`;
    compCounter.textContent = `${counter}`;
    sortBtnsEnable();
}
function quickSort(l, h) {
    //console.log(arrHeights);
    //console.log('start');

    if (l >= h) {
        return;
    }
    let p = partition(l, h);
    //console.log(p);
    quickSort(l, p - 1);
    quickSort(p + 1, h);

}
function partition(l, h) {
    let pivot = arrHeights[h];
    let i = l - 1;
    for (let j = l; j <= h - 1; j++) {
        counter++;
        if (arrHeights[j] < pivot) {
            i++;

            updateDiv(arr[h], arrHeights[h], 'yellow');
            updateDiv(arr[j], arrHeights[j], 'red');
            updateDiv(arr[i], arrHeights[i], 'red');
            //swap(arrHeights,j,i)
            let temp = arrHeights[j];
            arrHeights[j] = arrHeights[i];
            arrHeights[i] = temp;
            updateDiv(arr[i], arrHeights[i], 'red');
            updateDiv(arr[j], arrHeights[j], 'red');
        }
        if (i > 0) {
            updateDiv(arr[i], arrHeights[i], 'green');
        }
        updateDiv(arr[j], arrHeights[j], 'green');
        updateDiv(arr[0], arrHeights[0], 'green');
    }
    //swap (arrHeighst,i+1,h)
    let temp = arrHeights[i + 1];
    arrHeights[i + 1] = arrHeights[h];
    arrHeights[h] = temp;
    // console.log(pivot);
    // console.log(arrHeights[i + 1])
    updateDiv(arr[i + 1], arrHeights[i + 1], 'green');
    updateDiv(arr[h], arrHeights[h], 'green');
    // console.log(arrHeights);
    return i + 1;
}
function insertionSort() {
    sortBtnsDisable();
    time1 = Date.now();
    delay = 0;
    counter = 0;
    compCounter.textContent = '';
    for (let i = 0; i < arrHeights.length; i++) {
        let cur = arrHeights[i];
        updateDiv(arr[i], arrHeights[i], 'yellow');
        let j = i - 1;
        counter++;
        while (j >= 0 && arrHeights[j] > cur) {
            counter++;
            updateDiv(arr[j + 1], arrHeights[j + 1], 'yellow');
            arrHeights[j + 1] = arrHeights[j];
            updateDiv(arr[j + 1], arrHeights[j + 1], 'green');
            j--;
        }
        arrHeights[j + 1] = cur;
        updateDiv(arr[j + 1], arrHeights[j + 1], 'green');
        updateDiv(arr[i], arrHeights[i], 'green');
    }
    time2 = Date.now();
    timeSpan.textContent = `${(time2 - time1) / 1000}s`;
    compCounter.textContent = `${counter}`;
    sortBtnsEnable();
}
function startMergSort() {
    sortBtnsDisable();
    time1 = Date.now();
    delay = 0;
    counter = 0;
    compCounter.textContent = '';
    mergSort(0, arrHeights.length - 1);
    time2 = Date.now();
    timeSpan.textContent = `${(time2 - time1) / 1000}s`;
    compCounter.textContent = `${counter}`;
    sortBtnsEnable();
}
function mergSort(l, h) {

    if (l >= h) {//base case
        return;
    }

    let mid = parseInt((l + h) / 2);
    mergSort(l, mid);
    mergSort(mid + 1, h);
    merg(l, mid, h);


}
function merg(l, m, h) {

    let a1Length = m - l + 1;
    let a2Length = h - m;

    let L = [];
    let R = [];

    //copy data to L and R
    for (let i = 0; i < a1Length; i++) {
        L[i] = arrHeights[l + i];
        updateDiv(arr[l + i], arrHeights[l + i], 'red');
    }
    for (let i = 0; i < a1Length; i++) {
        R[i] = arrHeights[m + 1 + i];
        //updateDiv(arr[m + 1 + i], arrHeights[m + 1 + i], 'red');
    }

    //merging
    let i = 0;
    let j = 0;
    let k = l;
    while (i < a1Length && j < a2Length) {

        if (L[i] < R[j]) {
            updateDiv(arr[k], arrHeights[k], 'yellow');
            arrHeights[k] = L[i];
            updateDiv(arr[k], arrHeights[k], 'green');
            i++;
            // counter++;
        } else {
            arrHeights[k] = R[j];
            updateDiv(arr[k], arrHeights[k], 'yellow');
            updateDiv(arr[k], arrHeights[k], 'green');
            j++;

        }
        k++;
        counter++;
    }
    while (i < a1Length) {
        updateDiv(arr[k], arrHeights[k], 'yellow');
        arrHeights[k] = L[i];
        updateDiv(arr[k], arrHeights[k], 'green');
        i++;
        k++;
    }
    while (j < a2Length) {
        updateDiv(arr[k], arrHeights[k], 'yellow');
        arrHeights[k] = R[j];
        updateDiv(arr[k], arrHeights[k], 'green');
        j++;
        k++;
    }

}
