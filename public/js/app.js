var button = document.createElement('button');
var text = document.createTextNode('press 1');
button.appendChild(text);
document.body.appendChild(button);

button.addEventListener('click', function () {

    // let promise = new Promise(function(resolve, reject){
    //     if(div1 >= 1){
    //         console.log("Promise to the rescue")
    //         div1.style.display = "none";
    //     }
    // })

    var div1 = document.createElement('div');
    div1.id = "div1";
    var p = document.createElement('p');
    var text = textNode("text");
    p.appendChild(text);
    div1.appendChild(p);
    document.body.appendChild(div1);
 
})

function textNode(text) {
    if (typeof (text) === "string") {
        return document.createTextNode(text);
    }
    console.log('not a string');
}