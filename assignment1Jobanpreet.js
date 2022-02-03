const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    SAUCAGES:   Symbol("saucages"),
    DRINKS:  Symbol("drinks"),
    TOTAL:Symbol("total")
});

module.exports = class JobanpreetOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sSaucages = "";
        this.sDrinks = "";
        this.sItem = "Veggie Wraps";
        this.sTotal=0;   
    }
    handleInput(sInput){
        let aReturn = [];
        
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Jobanpreet VEGGIES...");
                aReturn.push("Select the size of your VEGGY WRAP ::");
                aReturn.push("Small [$2]");
                aReturn.push("Mediam [$3]");
                aReturn.push("Large [$4]");
                aReturn.push("Extra Large [$5]");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.SAUCAGES
                this.sSize = sInput;
                if(this.sSize.toLocaleLowerCase()=="small"){
                    this.sTotal=this.sTotal+2;
                }else if(this.sSize.toLocaleLowerCase()=="mediam"){
                    this.sTotal=this.sTotal+3;
                }else if(this.sSize.toLocaleLowerCase()=="large"){
                    this.sTotal=this.sTotal+4;
                }else if(this.sSize.toLocaleLowerCase()=="extra large"){
                    this.sTotal=this.sTotal+5;
                }
                console.log(this.sTotal);
                aReturn.push("Choose from the below given Saucages :: ");
                aReturn.push("Sweet Tomato Sauce [$1]");
                aReturn.push("Tangy Tomato Sauce [$1]");
                aReturn.push("Tangy with some Chilly Sauce [$1]");
                aReturn.push("Hot Chilly Sauce [$1]");
                break;
            case OrderState.SAUCAGES:
                this.stateCur = OrderState.DRINKS
                this.sSaucages = sInput;
                this.sTotal=this.sTotal+1;
                aReturn.push("Would you like drinks with that?");
                aReturn.push("7up [$1]");
                aReturn.push("Coca Cola [$1]");
                aReturn.push("Pepsi [$1]");
                aReturn.push("Mountain Dew [$1]");
                console.log(this.sTotal);
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                   
                    this.sDrinks = sInput;
                    this.sTotal=this.sTotal+1;
                    console.log(this.sTotal);
                }
                
                aReturn.push("Thank you for ordering in our Food Zone!!!. ");
                aReturn.push("Your order is :: ");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sSaucages}`);
                if(this.sDrinks){
                    aReturn.push("and  "+this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your total bill =$ ${this.sTotal}/-`);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}