let count = 0;
let seconds = 1;
let totalCount = 5;

let countUp = async (count) => {
    // base case
    if (count < totalCount) {
        // process data
        console.log(count);

        // delay recursion
        await sleep(seconds);

        // call function again
        countUp(++count);
    } else {
        // final block of code that will execute when count reaches totalCount
        console.log('finished processing');
    }
}

let sleep = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
}

countUp(count);