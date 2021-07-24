const container = document.querySelector('#container');

const data = [...Array(207).keys()];
console.log('dataArray:', data)

let start = 0;
let elementsToAdd = 5;

function hasMoreEntries(start, data) {
    return start === 0 || start < data.length;
}

function renderEntries() {

    // if (hasMoreEntries(start, data)) {

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
    start += elementsToAdd;

    // }



}

const topElementsRemoved = [];
function removeTopNodes() {
    const chunksArray = document.querySelectorAll('.dataChunk');
    console.log('startChuncks in div:', chunksArray.length)
    const howManyChunksInCointainer = chunksArray.length;
    if (howManyChunksInCointainer % 4 === 0) {
        console.log('REMOVING ELEMENTS!')

        const removedChunk = container.firstChild;
        // console.log('how many elements in chunk:', removedChunk.childElementCount())
        // data.splice(0, elementsToAdd)
        topElementsRemoved.push(removedChunk);
        container.firstChild.remove();
    }

    console.log('removed elements', topElementsRemoved, start)
}

const bottomElementsRemoved = [];
function removeBottomNodes() {
    const removedChunk = container.lastChild;
    bottomElementsRemoved.push(removedChunk);
    container.lastChild.remove();
}

// window.addEventListener('scroll', () => {
//     const {
//         scrollTop,
//         scrollHeight,
//         clientHeight
//     } = document.documentElement;

//     console.log('scrollTop:', scrollTop)
//     console.log('scrollHeight:', scrollHeight)
//     console.log('clientHeight:', clientHeight)

//     if (scrollTop + clientHeight >= scrollHeight - elementsToAdd &&
//         hasMoreEntries(total, data)) {
//         renderEntries()
//     }
// }, {
//     passive: true
// });

const scrollTop = document.querySelector('#scrollTop')
const scrollHeight = document.querySelector('#scrollHeight')
const clientHeight = document.querySelector('#clientHeight')

// for (let i = 0; i < 2; i++) {

renderEntries();
// }

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
        // testing remove nbottom nodes if deleted comment in following two lines
        removeBottomNodes();
        // -----------------------------------------------------
        // container.lastChild.remove();
        // start -= elementsToAdd;

    }
}

container.onscroll = logScroll;

