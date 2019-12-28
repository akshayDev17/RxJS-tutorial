import {Observable} from "rxjs" ;
import "rxjs/add/operator/share";

// // producing data outside an observable
// // HOT observable
// const rand_value = Math.random();

var observable = Observable.create( (observer:any) => {
    // observable is any 
    try{
        // // cold observable
        // observer.next(Math.random());

        // // hot observable
        // observer.next(rand_value);

        setInterval(() => {
            observer.next(Math.random())
        }, 1000)
        // observer.complete();
        // observer.next("This won't be sent");
    } catch(err) {
        observer.error(err);
    }
/* adding .share() after the closing bracket of create will
make the observable a hot one, i.e. values pushed into it will
be used by all subscriptions */
}).share();

// the proc ocurring below is called subscription
var observer1 = observable.subscribe(
    (x:any) => {addItem('observer 1 : '+x);},
    (error:any) => {addItem(error);},
    () => {addItem('Completed');}

);

setTimeout(() => {

/* this observer is subscribed to our observable
after an interval of 1s, hence it wont be able to 
capture the very first random number value pushed
into the observable. It will be able to capture
only those values emitted after t=1s. */
    var observer2 = observable.subscribe(
        (x:any) => {addItem('Observer 2: '+x);}
    );
    observer1.add(observer2);
}, 1000);


//-----  BEGIN CHILD SUBSCRIPTION  ---------------
// // add observer2 as a child subscription
// // to observer1,
// var observer2 = observable.subscribe(
//     (x:any) => {addItem('observer 2:'+x);}
// );

// // now, if onserver1 is unsubscribed, observer2 will also be unsubscribed
// observer1.add(observer2);
// ------ END CHILD SUBSCRIPTION  ---------------

// when we dont need  to receive the emitted values
// we can cancel the subscription
setTimeout(() => {
    // tutorial:
    observer1.unsubscribe();

    // me goofing around:
    // observer.complete();
}, 6000)
//observer.complete();


// any means datatype is of any type
// we use the "any" keyword because of typescript
function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById('output').appendChild(node);
}