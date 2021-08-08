const task = document.querySelector("#task");
const list = document.querySelector("#list");
const inputBtn = document.getElementById("liveToastBtn");

/* Kayıtlı liste yoksa kullanılacak*/
const defaultList = [{ "task": "3 Litre Su İç", "checked": 0 }, { "task": "Ödevleri Yap", "checked": 0 }, { "task": "En Az 3 Saat Kodlama Yap", "checked": 0 }, { "task": "Yemek Yap", "checked": 0 }, { "task": "50 Sayfa Kitap Oku", "checked": 0 }];

/* Varsa kayıtlı liste yoksa varsayılan listeyi tanımla */
const listItems = localStorage.getItem("listItems") ? JSON.parse(localStorage.getItem("listItems")) : defaultList;

/* Localstorage'da kayıtlı verileri listeye ekleme */
function loadFromStorage() {
    listItems.forEach(x => {

        let element = document.createElement("li");
        let deleteButton = document.createElement("span");

        deleteButton.innerHTML = "&times;";
        deleteButton.classList.add("close");
        deleteButton.addEventListener("click", deleteElement);

        element.innerText = x["task"];
        element.appendChild(deleteButton);
        element.addEventListener("click", check);

        if (x["checked"] == 1) {
            element.classList.add("checked");
        }

        list.appendChild(element);
    })
}

/* Ekle butonu ile listeye eleman ekleme */
function newElement() {
    if (task.value.search(/\S/) === -1) {
        $('#errorToast1').toast('show');
        task.value = "";
    }
    else if (listItems.some(x => x["task"] === task.value)) {
        $('#errorToast2').toast('show');
        task.value = "";
    }
    else {
        let element = document.createElement("li");
        let deleteButton = document.createElement("span");

        deleteButton.innerHTML = "&times;";
        deleteButton.classList.add("close");
        deleteButton.addEventListener("click", deleteElement);

        element.innerText = task.value;
        element.appendChild(deleteButton);
        element.addEventListener("click", check);

        list.appendChild(element);

        listItems.push({ "task": task.value, "checked": 0 });
        localStorage.setItem("listItems", JSON.stringify(listItems));

        task.value = "";
        $('#successToast').toast('show');
    }
}

/* X butonu ile listeden eleman silme */
function deleteElement(event) {
    event.stopPropagation();
    let item = event.target.parentElement;
    let task = item.childNodes[0].nodeValue;
    item.remove();

    listItems.splice(listItems.findIndex(x => x["task"] == task), 1);
    localStorage.setItem("listItems", JSON.stringify(listItems));
}

/* Liste elemanlarının üzerine tıklanınca yapıldı olarak işaretleme */
function check(event) {
    let task = event.target.childNodes[0].nodeValue;
    event.target.classList.toggle("checked");

    let indexOfItem = listItems.findIndex(x => x["task"] == task);
    if (listItems[indexOfItem]["checked"] == 0) {
        listItems[indexOfItem]["checked"] = 1
    }
    else {
        listItems[indexOfItem]["checked"] = 0
    }
    localStorage.setItem("listItems", JSON.stringify(listItems));
}

/* Ekle butonunun enter tuşu ile de çalıştırma */
task.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        inputBtn.click();
    }
});