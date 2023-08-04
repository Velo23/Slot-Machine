// Creating a slot machine
// 1. Deposit some money 
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings 
// 7. Start all over 

const prompt = require("prompt-sync")();// Allows user to input amount--The package that was install in the terminal 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {//possible symbols in the wheels in each col and row
    $: 2,
    "%": 4,
    "+": 6,
    "-": 8
}

const SYMBOL_VALUES = {//multipler of each symbol 
    $: 4,
    "%": 1,
    "+": 5,
    "-": 8
}











const deposit = () => {
    while (true){       // While loop ---true is indfinit

    
    const depositAmount = prompt("Enter a deposit amount:  ");
    const numberDepositAmount = parseFloat(depositAmount);
    //parseFloat function is going to take a string and convert it into its floating value Ex: "17.2" => 17.2

    // isNaN is a function,  checks if its a valid number if not display error

    if (isNaN(numberDepositAmount) || numberDepositAmount <=0){
        console.log("Invalid Deposit Amount, try again!");
    }else{
        return numberDepositAmount;
    }
}
};

const getNumberOfLines = () => {
        while (true){       // While loop ---true is indfinit
    
        
        const lines = prompt("Enter the number of lines to bet on (1-3):  ");
        const numberOfLines = parseFloat(lines);
        
   
    
        if (isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again!");
        }else{
            return numberOfLines;
        }
    }


}

const getBet = (balance, lines) => {
    while (true){       // While loop ---true is indfinit
    
        
        const bet = prompt("Enter the total bet, per line:  ");
        const numberOfBets = parseFloat(bet);
        
   
    
        if (isNaN(numberOfBets) || numberOfBets <=0 || numberOfBets > balance / lines){
            console.log("Invalid number of lines, try again!");
        }else{
            return numberOfBets;
        }
    }


};

const spin = () =>{
    const symbols =[];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){// Object.entries returns an array whose elements are arrays corresponding to the enumerable string-keyed property key-value pairs found directly upon object 
        console.log(symbol, count);
        for (let i =0; i < count; i++ ) {
            symbols.push(symbol);  // push is what you insert a new element inside of the array 
        }
    }


    const reels = [];
    for (let i =0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];//copy, the symvols we have avaiable to choose from the reel into another array 
        for (let j=0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)//Math.random generates random number ,,,but the takes that number then multiples by the length of the reel symbols /indexs 
            const selectedSymbol =reelSymbols[randomIndex];//Math.floor = rounds the number to the nearest whole number 
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);//splice the random index, random is chossen a random 

        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows =[];
    for (let i =0; i < ROWS; i++){
        rows.push([]);
        for (let j =0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }


return rows
};

const printSlot = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row =0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame =false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = ()=>{
let balance = deposit();

while (true){
    console.log("You have a balance of $" + balance);
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
balance -= bet*numberOfLines;
const reels = spin();
const rows = transpose(reels);
printSlot(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
balance += winnings;
console.log("You've won, $" + winnings.toString());

if (balance <=0){
    console.log("Ran out of money!");
    break;
}
    const playAgain = prompt("Do you want to play Again (y/n)? ");
    if(playAgain != "y")break;
}
};
game();