const tableEl = document.querySelector('.wrapper')
createTable()

async function createTable() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
    let table = '<table class="table" id="table">' +
        '<thead>' +
        '<tr>' +
        '<th data-type="number" data-sort="down">Номер пользователя</th>' +
        '<th data-type="number" data-sort="down">Номер</th>' +
        '<th data-type="string" data-sort="down">Заголовок</th>' +
        '<th data-type="string" data-sort="down">Описание</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody class="tbody">'


    for (let item of data) {
        table += '<tr>' +
            `<td>${item.userId}</td>` +
            `<td>${item.id}</td>` +
            `<td>${item.title}</td>` +
            `<td>${item.body}</td>` +
            '</tr>'
    }
    table += '</tbody></table>'
    tableEl.innerHTML = table
    const tableElement = document.querySelector('table')
    tableElement.addEventListener('click', (e) => {
        if (e.target.tagName !== 'TH') return
        let th = e.target
        sortTable(th.cellIndex, th)
    })
}

function sortTable(colNum, th) {
    const tbody = document.querySelector('.tbody')
    const type = th.dataset.type
    const sortType = th.dataset.sort
    let rowsArray = Array.from(tbody.rows)
    let compare;
    switch (type) {
        case 'number' :
            compare = function (rowA, rowB) {
                if (sortType === 'up') {
                    th.dataset.sort = 'down'
                    return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML
                }
                th.dataset.sort = 'up'
                return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML
            }
            break;
        case 'string' :
            compare = function (rowA, rowB) {
                if (sortType === 'up') {
                    th.dataset.sort = 'down'
                    return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1
                }
                th.dataset.sort = 'up'
                return rowB.cells[colNum].innerHTML > rowA.cells[colNum].innerHTML ? 1 : -1
            }
            break;
    }
    rowsArray.sort(compare)
    tbody.append(...rowsArray)
}

function tableSearch() {
    let phrase = document.querySelector('input');
    let table = document.querySelector('.table');
    let regPhrase = new RegExp(phrase.value, 'i');
    let flag = false;
    for (let i = 1; i < table.rows.length; i++) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
}

document.querySelector('.input').addEventListener('keyup', tableSearch)





