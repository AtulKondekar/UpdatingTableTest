
const sparkLineData = {};

/*
    This function is used to create a obje of array of object where we store the mid price and the time stamp
*/
export const setSparkLineData = (data) => {
    let midPrice = (data.bestBid + data.bestAsk) / 2;
    if (sparkLineData[data.name]) {
        sparkLineData[data.name].push({
            time: new Date().getTime(),
            value: midPrice
        });
    }
    else {
        sparkLineData[data.name] = [{
            time: new Date().getTime(),
            value: midPrice
        }];
    }
    drawSparkLine();
}

/*
    This function is used to draw the spark line
*/
export const drawSparkLine = () => {
    let compareTime = new Date().getTime() - (30*1000); // this is used to the get the data of last 30 secs

    for(let key in sparkLineData){  // Looping through all the prices data
        let sparkDataArry = sparkLineData[key];
        if(sparkDataArry){
            let sparkLineDraw = [];
            let spliceIndex = null;

            for(let i = sparkDataArry.length - 1; i >= 0; i--){ // reversing looping through the individual price
                let sparkDataObj = sparkDataArry[i];
                if(sparkDataObj.time >= compareTime){ // comparing if the data is not older than 30sec
                    sparkLineDraw.push(sparkDataObj.value);
                }
                else{
                    spliceIndex = i;
                    break;
                }
            }
            if(spliceIndex)
                sparkDataArry.splice(0, spliceIndex); // deleting the stale data which is older than 30secs

            sparkLineDraw.reverse(); // reversing the line to show the form old to new
            const sparkLineEL = document.getElementById(`span-${key}`); // getting an element to inserth the line

            Sparkline.draw(sparkLineEL, sparkLineDraw);
        }
    }
}