const rowCount = (sentence) => {
    let rows = sentence.split(' ').length
    console.log(rows)
    return rows
}

const columnCount = (word) => {
    let rows = word.split('').length
    return rows
}

module.exports = {rowCount, columnCount}