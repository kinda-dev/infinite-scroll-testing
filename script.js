const container = document.querySelector('#container');

const data = [...Array(53).keys()];


let total = 0;
let start = 0;

function hasMoreEntries(total, data) {
    return total === 0 || start < data.length;
}

function renderEntries() {

    if (hasMoreEntries(total, data)) {

        const entriesUl = document.createElement('ul');
        for (let i = start; i < total + 5; i++) {
            if (data[i]) {

                const singleEntry = document.createElement('li');
                singleEntry.setAttribute('class', 'entry');
                singleEntry.textContent = `entry n' ${data[i]}`;
                entriesUl.appendChild(singleEntry);
            }
        }
        entriesUl.setAttribute('id', `nodeNumber${total}`);
        container.appendChild(entriesUl);
        total += 5;
        start += 5;

    }

}

for (let i = 0; i < 11; i++) {

    renderEntries();
    console.log(total)
}


