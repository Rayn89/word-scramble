const scrambler = (sentence) => {
    let splitter = sentence.split(" ")
    let returnArray = [];
    for(let i = 0; i < splitter.length; i++) {
        if(splitter[i] && splitter[i].length <= 3){
            returnArray.push(splitter[i])
        }else{
            let first = splitter[i][0]
            let last = splitter[i][splitter[i].length - 1];
            let middle = []
            let word = splitter[i].slice(1, splitter[i].length-1).split('')

            while(word.length > 0){
                let index = Math.floor(Math.random() * word.length);
                let letter = word.splice(index, 1)
                middle.push(letter)
            }
            returnArray.push(first + middle.join('') + last)
        }
    }
    return returnArray.join(' ')
};

module.exports = scrambler;