
/*
    This function is used to create a <tbody> using JS code and set the data in it
*/
const setTableData = (tableData) => {
    let table = document.getElementById('table');
    let tbody = document.createElement('tbody');

    for (let i = 0; i < tableData.length; i++) {
        let rowData = tableData[i];

        let tr = document.createElement('tr');

        let td_Srno = document.createElement('td');
        let td_name = document.createElement('td');
        let td_bestBid = document.createElement('td');
        let td_bestAsk = document.createElement('td');
        let td_openBid = document.createElement('td');
        let td_openAsk = document.createElement('td');
        let td_lastChangeAsk = document.createElement('td');
        let td_lastChangeBid = document.createElement('td');

        let td_sparkLine = document.createElement('td');

        let text_Srno = document.createTextNode(i + 1);
        let text_name = document.createTextNode(rowData.name);
        let text_bestBid = document.createTextNode(rowData.bestBid);
        let text_bestAsk = document.createTextNode(rowData.bestAsk);
        let text_openBid = document.createTextNode(rowData.openBid);
        let text_openAsk = document.createTextNode(rowData.openAsk);
        let text_lastChangeAsk = document.createTextNode(rowData.lastChangeAsk);
        let text_lastChangeBid = document.createTextNode(rowData.lastChangeBid);

        let span_SparkLine = document.createElement('span'); // created the span to inser the spark line
        span_SparkLine.id = `span-${rowData.name}`;

        td_Srno.appendChild(text_Srno);
        td_name.appendChild(text_name);
        td_bestBid.appendChild(text_bestBid);
        td_bestAsk.appendChild(text_bestAsk);
        td_openBid.appendChild(text_openBid);
        td_openAsk.appendChild(text_openAsk);
        td_lastChangeAsk.appendChild(text_lastChangeAsk);
        td_lastChangeBid.appendChild(text_lastChangeBid);

        td_sparkLine.appendChild(span_SparkLine);

        tr.appendChild(td_Srno);
        tr.appendChild(td_name);
        tr.appendChild(td_bestBid);
        tr.appendChild(td_bestAsk);
        tr.appendChild(td_openBid);
        tr.appendChild(td_openAsk);
        tr.appendChild(td_lastChangeAsk);
        tr.appendChild(td_lastChangeBid);
        tr.appendChild(td_sparkLine);

        tbody.appendChild(tr);
    }
    let oldTbody = table.getElementsByTagName("tbody")[0];
    table.replaceChild(tbody, oldTbody); // replacing the old data with new
}


/*
    This function is used to sort the array of objects based on it's property name
*/
const sortByKey = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/*
    This function is used to convert the prices data into array
    and sort it in descending order on last changed bid
*/
export const formatTableData = (pricesData) => {
    let tableData = Object.values(pricesData);
    tableData.sort(sortByKey('-lastChangeBid'));
    setTableData(tableData);
}