const task = document.querySelector("#task");
const list = document.querySelector("#list");

function newElement() {
    if (task.value.search(/\S/) > -1) {
        let element = document.createElement("li");
        let deleteButton = document.createElement("span");

        deleteButton.innerHTML = "&times;";
        deleteButton.classList.add("close");
        deleteButton.addEventListener("click", deleteElement);

        element.innerText = task.value;
        element.appendChild(deleteButton);
        element.addEventListener("click", check);

        list.appendChild(element);

        task.value = "";
        $('#successToast').toast('show')
    }
    else {
        $('#errorToast').toast('show');
        task.value = "";
    }
}

function deleteElement(event) {
    let item = event.target.parentElement;
    item.remove();
}

function check(event) {
    event.target.classList.toggle("checked");
}

document.querySelectorAll("li>span").forEach(x => x.addEventListener("click", deleteElement));
document.querySelectorAll("li").forEach(x => x.addEventListener("click", check));