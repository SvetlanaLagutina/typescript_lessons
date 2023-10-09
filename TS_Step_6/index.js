"use strict";
// Практика работы с DOM
// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом
const forms = document.querySelectorAll("form");
const email = document.querySelector("#email");
const title = document.querySelector("#title");
const text = document.querySelector("#text");
const checkbox = document.querySelector("#checkbox");
const formData = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};
forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Можно создать другой объект для соблюдения иммутабельности
        formData.email = email?.value ?? "";
        formData.title = title?.value ?? "";
        formData.text = text?.value ?? "";
        formData.checkbox = checkbox?.checked ?? false;
        if (validateFormData(formData)) {
            checkFormData(formData);
        }
    });
});
function validateFormData(data) {
    // Если каждое из свойств объекта data правдиво...
    if (Object.values(data).every((value) => value)) {
        return true;
    }
    else {
        console.log("Please, complete all fields");
        return false;
    }
}
function checkFormData(data) {
    const { email } = data;
    const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];
    // Если email совпадает хотя бы с одним из массива
    if (emails.some((e) => e === email)) {
        console.log("This email is already exist");
    }
    else {
        console.log("Posting data...");
    }
}
