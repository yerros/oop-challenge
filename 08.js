const fs = require('fs');

class Cart {

    addItem(item){
        basket.push({
            item_id: item.item_id,
            price: item.price,
            quantity: item.quantity || 1
        })
    }

    removeItem(id){
        const willRemove = basket.indexOf(basket.find(baskets => baskets.item_id == id.item_id ))
        if(willRemove !== -1){
            basket.splice(willRemove, 1)
        }
        // basket.splice(willRemove, 1)
        
    }

    totalItems(){
        console.log(basket.length)
    }

    addDiscount(disc) {
        const diskon = Number(disc.replace('%',''))
        const willDiscount = basket.map(item => {
            return {
            ...item,
            price: diskon * item.price / 100}
        })
        console.log(willDiscount)
    }

    totalQuantity(){
        let totalqty = 0;
        basket.map(baskets => {
            return totalqty += baskets.quantity
        })
        console.log(totalqty)
    }

    showAll(){
        const all = basket.map(item => {
            return `ID :${item.item_id}, harga: ${item.price}`
        })
        console.log(all);
    }

    checkout(path){
        const files = fs.writeFile(path, JSON.stringify(basket), 'utf-8', function(res, err){
            if(err){
                console.log(err);
            } else {
                console.log(fs.readFileSync(path, 'utf-8'));
            }
        })
        return files
    }
}


let basket = []
const cart = new Cart();
cart.addItem({ item_id: 1, price: 30000, quantity: 3 })
cart.addItem({ item_id: 2, price: 10000 })               // By default quantity is 1
cart.addItem({ item_id: 3, price: 5000, quantity: 2 })
cart.removeItem({item_id: 10})
// cart.addItem({ item_id: 4, price: 400, quantity: 6 })
// cart.addDiscount('50%')

// cart.totalItems()
cart.totalQuantity()
// console.log('------------------------')
//cart.showAll()
cart.checkout('dataCheckout.json')