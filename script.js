const container = document.querySelector('#container');
container.onscroll = logScroll;


const data = [...Array(207).keys()];


function renderEntries() {

    const entriesUl = document.createElement('ul');
    let toRender = data.splice(0, 5);
    if (data.length < 5) toRender = data.splice(0, data.length);

    for (let i = 0; i < toRender.length; i++) {
        if (toRender[i] || toRender[i] === 0) {
            const singleEntry = document.createElement('li');
            singleEntry.setAttribute('class', 'entry');
            singleEntry.textContent = `entry n' ${toRender[i]}`;
            entriesUl.appendChild(singleEntry);
        }
    }

    entriesUl.setAttribute('class', `dataChunk`);
    container.appendChild(entriesUl);

}

const topElementsRemoved = [];
function removeTopNodes() {
    const chunksArray = document.querySelectorAll('.dataChunk');
    const howManyChunksInCointainer = chunksArray.length;
    if (howManyChunksInCointainer % 4 === 0) {
        const removedChunk = container.firstChild;
        topElementsRemoved.push(removedChunk);
        container.firstChild.remove();
    }

}

const bottomElementsRemoved = [];
function removeBottomNodes() {
    const removedChunk = container.lastChild;
    bottomElementsRemoved.push(removedChunk);
    container.lastChild.remove();
}

const scrollTop = document.querySelector('#scrollTop')
const scrollHeight = document.querySelector('#scrollHeight')
const clientHeight = document.querySelector('#clientHeight')



function logScroll(e) {
    console.log('DATA LENGTH:', data.length)
    removeTopNodes();
    scrollTop.textContent = `Scroll top: ${e.target.scrollTop}`;
    scrollHeight.textContent = `Scroll height: ${e.target.scrollHeight}`;
    clientHeight.textContent = `Scroll client height: ${e.target.clientHeight}`;
    if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - 5) {
        console.log('ADDING ELEMENTS!')
        if (bottomElementsRemoved.length > 0) {
            const elementToAdd = bottomElementsRemoved.pop();
            container.appendChild(elementToAdd);
        } else {
            renderEntries();
        }
    }
    if (e.target.scrollTop <= 480 && topElementsRemoved.length > 0) {

        const elementToAdd = topElementsRemoved.pop();
        console.log('element to add:', elementToAdd)
        container.prepend(elementToAdd);
        console.log('ADDING REMOVED ELEMENTS!')
        removeBottomNodes();

    }
}

renderEntries();

