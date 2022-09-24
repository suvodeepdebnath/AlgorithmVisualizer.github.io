// initialization 
let random_array = document.getElementById("random_array_button");
let sort_button = document.getElementById("sort_button");
let bars_container = document.getElementById("bars_container");
let slider = document.getElementById("slider");
let speed = document.getElementById("speed");
let algorithm = document.getElementById("algorithm");
let minRange = 1;
let maxRange = slider.value;
var length = slider.value;
var algo = algorithm.value;
var visualization_speed = speed.value;
var unsorted_array = new Array(length);
var height_factor = 10;

// generate the bars on initialization
document.addEventListener("DOMContentLoaded", function() {
    unsorted_array = generateRandomArray();
    renderBars(unsorted_array);
});

// random_array event listener
random_array.addEventListener("click", function(){
    unsorted_array = generateRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

 // get slider input
 slider.addEventListener("input", function(){
    maxRange = slider.value;
    length = slider.value;
    bars_container.innerHTML = "";
    unsorted_array =  generateRandomArray();
    renderBars(unsorted_array);
 });

//algorihtm selector 
algorithm.addEventListener("change", function(){
    algo = algorithm.value;
});

// select speed
speed.addEventListener("change", function(){
    visualization_speed = speed.value;
});
// generate random number
function generateRamdomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// generate random array
function generateRandomArray(){
    let arr = new Array(length);
    for(let i = 0; i < length; i++){
        arr[i] = generateRamdomNumber(minRange, maxRange);
    }
    return arr;
}

// render bars
function renderBars(array){
    for(let i = 0;i < length; i++){
        let bar = document.createElement("bar");
        bar.classList.add("bar");
        bar.style.height = array[i] * height_factor  + "px";
        bar.innerHTML = array[i];
        bar.style.color = "black";
        bar.style.alignSelf = "center";
        bar.style.textAlign = "center";
        bars_container.appendChild(bar);
    }
}

// sort button event listener
sort_button.addEventListener("click", function(){
    var sorted_array;
    switch(algo){
        case "selection" : 
            sorted_array = selectionSort(unsorted_array);
            break;
        case "bubble" : 
            sorted_array = bubbleSort(unsorted_array);
            break;
        case "merge" :
            sorted_array = mergeSort(unsorted_array);
            break;
        case "insertion" : 
            sorted_array = insertionSort(unsorted_array);
            break;
        case "quick" : 
            sorted_array = quickSort(unsorted_array);
            break;
        case "heap" :
            sorted_array = heapSort(unsorted_array);
            break;
    }
 });

// sleep or wait time
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// swap array elements
async function swap(arr, i, j, bars)
{
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    bars[i].style.height = arr[i] * height_factor + "px";
    bars[i].style.backgroundColor = "green";
    bars[j].style.height = arr[j] * height_factor + "px";
    bars[j].style.backgroundColor = "green";
    await sleep(visualization_speed);
}

// bubble sort
async function bubbleSort(arr){
    let bars = document.getElementsByClassName("bar");
    for(var i = 0; i < arr.length; i++){
      // Last i elements are already in place 
      for(var j = 0; j < ( arr.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(arr[j] > arr[j+1]){
           
          // If the condition is true then swap them
          //swap(arr, j, j + 1, bars);
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            bars[j].style.height = arr[j] * height_factor + "px";
            bars[j].style.backgroundColor = "lightblue";
            bars[j + 1].style.height = arr[j + 1] * height_factor + "px";
            bars[j + 1].style.backgroundColor = "orange";
            await sleep(visualization_speed);
        }
      }
        bars[arr.length - 1 - i].style.height = arr[arr.length - 1 - i] * height_factor + "px";
        bars[arr.length - 1 - i].style.backgroundColor = "green";
        await sleep(visualization_speed);
    }
}

// selection sort
async function selectionSort(arr)
{
    let bars = document.getElementsByClassName("bar");
    var i, j, min_idx;
    var n = arr.length;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++){
            if (arr[j] < arr[min_idx]){
                min_idx = j;
            }
        }

        // Swap the found minimum element with the first element
        //swap(arr,min_idx, i, bars);
        var temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;

        bars[min_idx].style.backgroundColor = "yellow";
        await sleep(visualization_speed / 2);
        bars[i].style.height = arr[i] * height_factor + "px";
        bars[i].style.backgroundColor = "green";
        
        if(min_idx != i){
            bars[min_idx].style.height = arr[min_idx] * height_factor + "px";
            bars[min_idx].style.backgroundColor = "yellow";
        }

        await sleep(visualization_speed);
    }

    return arr;
}

// insertion sort
async function insertionSort(arr)  
{  
    let bars = document.getElementsByClassName("bar");
    let i, key, j;  
    n = arr.length;

    for (i = 1; i < n; i++) 
    {  
        key = arr[i];  
        j = i - 1;  
        bars[i].style.height = arr[i] * height_factor + "px";
        bars[i].style.backgroundColor = "red";
        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && arr[j] > key) 
        {  
            arr[j + 1] = arr[j];  
            bars[j + 1].style.height = arr[j + 1] * height_factor + "px";
            bars[j + 1].style.backgroundColor = "green";
            bars[j].style.height = key * height_factor + "px";
            bars[j].style.backgroundColor = "red";
            j = j - 1; 

            await sleep(visualization_speed);
        }  

        arr[j + 1] = key;  
        bars[j + 1].style.height = key * height_factor + "px";
        bars[j + 1].style.backgroundColor = "green";
        await sleep(visualization_speed);
    }  
}  

// merge sort
async function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++){
        L[i] = arr[l + i];

    }
    for (var j = 0; j < n2; j++){
        R[j] = arr[m + 1 + j];
    }
 
    // Merge the temp arrays back into arr[l..r]
    // Initial index of first subarray
    var i = 0;
    // Initial index of second subarray
    var j = 0;
    // Initial index of merged subarray
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    let bars = document.getElementsByClassName("bar");
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r, bars);
}


// quick sort
function partition(arr, low, high) {
  
    // pivot
    let pivot = arr[high];
  
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
  
        // If current element is smaller 
        // than the pivot
        if (arr[j] < pivot) {
  
            // Increment index of 
            // smaller element
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}
  
// quick sort
function quickSort(arr, low, high) {
    if (low < high) {
  
        // pi is partitioning index, arr[p]
        // is now at right place 
        let pi = partition(arr, low, high);
  
        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// heap sort
function sort( arr){
    var N = arr.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
        heapify(arr, N, i);

    // One by one extract an element from heap
    for (var i = N - 1; i > 0; i--) {
        // Move current root to end
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i)
{
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < N && arr[l] > arr[largest])
        largest = l;

    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(arr, N, largest);
    }
}