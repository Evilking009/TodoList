// Adds Item and put or update to LocalStorage
getAndUpdate = () => {

    title = document.getElementById('title').value;
    desc = document.getElementById('description').value;

    if (title == '' || desc == '') {
        alert('Please add your title & description of your item!');
    }
    else {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }
        // If LocalStorage is not empty
        else {
            itemJsonArrayString = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayString);
            itemJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }
        update();
    }

}

// Refreshes the Table in HTML
update = () => {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayString = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayString);
    }
    // Populate the table
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        // BackTicks Used
        str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-danger" onclick="removeItem(${index})">Delete</button></td>
                    </tr>`;
    });
    tableBody.innerHTML = str;
}

// Remove Specific Item from list upon delete button
removeItem = (itemIndex) => {

    itemJsonArrayString = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayString);

    // Delete itemIndex element from array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

// Clears all List
clearAll = () => {

    if (confirm("Do you really want to clear list?")) {
        localStorage.clear();
        update();
    }

}


// Adds Item and Refresh Table upon Click Event
add = document.getElementById('add');
add.addEventListener('click', getAndUpdate);
update();