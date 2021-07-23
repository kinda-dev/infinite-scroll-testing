const container = document.querySelector('#container');

const data = [...Array(53).keys()];


let total = 5;
let start = 0;
function renderEntries() {
    const entriesUl = document.createElement('ul');
    for (let i = start; i < total; i++) {
        const singleEntry = document.createElement('li');
        singleEntry.setAttribute('class', 'entry');
        singleEntry.textContent = `entry n' ${data[i]}`;
        entriesUl.appendChild(singleEntry);
    }
    entriesUl.setAttribute('id', `nodeNumber${total}`);
    container.appendChild(entriesUl);
    total += 5;
    start += 5;
}
console.log(total)
renderEntries();
console.log(total)
renderEntries();
console.log(total)

