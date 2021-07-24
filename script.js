const container = document.querySelector('#container');

const data = [...Array(207).keys()];
console.log('dataArray:', data)

let start = 0;

function hasMoreEntries(start, data) {
    return start === 0 || start < data.length;
}

function renderEntries() {

    if (hasMoreEntries(start, data)) {

        const entriesUl = document.createElement('ul');
        for (let i = start; i < start + 5; i++) {
            if (data[i] || data[i] === 0) {
                const singleEntry = document.createElement('li');
                singleEntry.setAttribute('class', 'entry');
                singleEntry.textContent = `entry n' ${data[i]}`;
                entriesUl.appendChild(singleEntry);
            }
        }
        entriesUl.setAttribute('class', `dataChunk`);
        container.appendChild(entriesUl);
        start += 5;

    }



}

let removedElements = [];
function removeNodes() {
    let chunksArray = document.querySelectorAll('.dataChunk');
    console.log('startChuncks in div:', chunksArray.length)
    let howManyChunksInCointainer = chunksArray.length;
    if (howManyChunksInCointainer % 4 === 0) {
        console.log('REMOVING ELEMENTS!')

        let removedChunk = container.firstChild;
        // console.log('how many elements in chunk:', removedChunk.childElementCount())
        removedElements.push(removedChunk);
        container.firstChild.remove();
    }

    console.log('removed elements', removedElements)
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

//     if (scrollTop + clientHeight >= scrollHeight - 5 &&
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
    removeNodes();
    scrollTop.textContent = `Scroll top: ${e.target.scrollTop}`;
    scrollHeight.textContent = `Scroll height: ${e.target.scrollHeight}`;
    clientHeight.textContent = `Scroll client height: ${e.target.clientHeight}`;
    if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - 5) {
        console.log('ADDING ELEMENTS!')
        renderEntries();
    }
    if (e.target.scrollTop <= 480 && removedElements.length > 0) {
        let elementToAdd = removedElements.pop();
        // while (e.target.scrollTop <= 480 && removedElements.length > 0) {

        console.log('element to add:', elementToAdd)
        container.prepend(elementToAdd);
        console.log('ADDING REMOVED ELEMENTS!')
        container.lastChild.remove();
        start -= 5;
        // }

    }
}

container.onscroll = logScroll;

