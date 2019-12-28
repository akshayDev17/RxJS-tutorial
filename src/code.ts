import { BehaviorSubject} from "rxjs/BehaviorSubject";

// this needs an argument as an initial value
var subject = new BehaviorSubject('First');

// subject as an observer
subject.subscribe(
    data => addItem('Observer1: '+data),
    error => addItem(error),
    () => addItem('Observer 1 completed')

);
// subject as an observable
subject.next("this is the first thing to be sent");

/* this will be captured also by observer2
even though it is subscribed after this value is
emitted */
subject.next("---Observer2 is about to subscribe----");

var observer2 = subject.subscribe(
    data => addItem('Observer2: '+data)
);

subject.next("this is the 2nd thing");

observer2.unsubscribe();

// only the subject(behaving as an observer) will capture these values
subject.next("this is the 3rd thing");
subject.next("this is the 4th thing");

function addItem(x:any) {
    var li_tag = document.createElement("li");
    var li_tag_text = document.createTextNode(x);
    li_tag.appendChild(li_tag_text);
    document.getElementById("output").appendChild(li_tag);
}