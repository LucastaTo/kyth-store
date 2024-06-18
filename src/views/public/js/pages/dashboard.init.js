let sortBy = document.getElementById("sortBy");
let openModalSpinner = document.getElementById("openModal");

function sortTypeSwitch() {
    let sort = document.getElementById("sort");
    if (sort.value === "ASC") sort.value = "DESC";
    else sort.value = "ASC";
}

// Filter by valid
let valid = document.getElementById("validSelect");
if (valid)
    valid.addEventListener("change", function () {
        openModalSpinner.click();
        if (currentPage) {
            currentPage.value = 1;
        }
        document.getElementById("search-form").submit();
    });

// Open modal create new registration If validator
let openModal = document.getElementsByClassName("open-modal");
if (openModal.length > 0) {
    openModal[0].click();
}

// Sort by Id
let sortId = document.getElementById("sort-by-id");
if (sortId) {
    sortId.addEventListener("click", function () {
        if (sortBy.value === "id") sortTypeSwitch();
        sortBy.value = "id";
        document.getElementById("search-form").submit();
    });
}

// Sort by name
let sortName = document.getElementById("sort-by-name");
if (sortName) {
    sortName.addEventListener("click", function () {
        if (sortBy.value === "name") sortTypeSwitch();
        sortBy.value = "name";
        document.getElementById("search-form").submit();
    });
}

// Sort by Katakana Name
let sortKatakanaName = document.getElementById("sort-by-katakanaName");
if (sortKatakanaName) {
    sortKatakanaName.addEventListener("click", function () {
        if (sortBy.value === "katakanaName") sortTypeSwitch();
        sortBy.value = "katakanaName";
        document.getElementById("search-form").submit();
    });
}

// Sort by createdAt
let sortCreatedAt = document.getElementById("sort-by-createdAt");
if (sortCreatedAt) {
    sortCreatedAt.addEventListener("click", function () {
        if (sortBy.value === "createdAt") sortTypeSwitch();
        sortBy.value = "createdAt";
        document.getElementById("search-form").submit();
    });
}

let href = window.location.href;

// Handle button delete
let wordList = document.getElementById("wordList");
let wordRow;
let params;
function getHrefInput(form) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.id = "href";
    input.name = "href";
    let value = document.location.search;
    if (JSON.parse(wordList.dataset.test).length == 1 && form.action.indexOf(`delete`) > -1 && Number(currentPage.value) !== 1) {
        let getPageIndex = new URLSearchParams(value.substring(value.indexOf("?")));
        let getPage = getPageIndex.get("page");
        value = value.replace(getPage, getPage - 1);
    }
    input.value = String(value);
    form.appendChild(input);
}
if (wordList) {
    JSON.parse(wordList.dataset.test).forEach((id) => {
        params = document.getElementById(`sa-params-${id}`);
        forms = document.getElementById(`form-delete`);
        if (!forms) {
            forms = document.createElement("form");
            forms.id = "form-delete";
            forms.style.display = "none";
            document.getElementById(`delete-btn-${id}`).appendChild(forms);
        }
        wordRow = document.getElementsByClassName(`word-${id}`);
        if (params && wordRow)
            params.addEventListener("click", function () {
                Swal.fire({
                    title: "本当に削除しますか？",
                    text: "元に戻すことはできません！",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "削除する",
                    cancelButtonText: "キャンセル",
                    confirmButtonClass: "btn btn-success mt-2",
                    cancelButtonClass: "btn btn-danger ms-2 mt-2",
                    buttonsStyling: false,
                    focusCancel: true,
                }).then(function (result) {
                    if (result.value) {
                        forms.method = "POST";
                        forms.action = `/word-list/${id}/delete`;
                        getHrefInput(forms);
                        forms.submit();
                    }
                });
            });

        // When modal close
        let modal = document.getElementById("edit-modal");
        modal.addEventListener("hidden.bs.modal", function () {
            let error = document.getElementsByClassName("invalid-feedback");
            let inputName = document.getElementById("edit-name");
            let isActive = document.getElementById("editActivateCheckbox");
            let inputCreate = document.getElementById("name");
            inputCreate.value = "";
            inputName.value = "";
            isActive.checked = false;
            inputName.classList.remove("form-error");
            if (error.length > 0) {
                error[0].remove();
            }
        });
    });
}

// Handle checkbox create
let checkboxBtnCreate = document.getElementById("createActivateCheckbox");
if (checkboxBtnCreate) {
    checkboxBtnCreate.addEventListener("click", function () {
        if (checkboxBtnCreate.checked) {
            checkboxBtnCreate.value = "true";
        } else {
            checkboxBtnCreate.value = "false";
        }
    });
}

// Handle checkbox edit
let checkboxBtnEdit = document.getElementById("editActivateCheckbox");
if (checkboxBtnEdit) {
    checkboxBtnEdit.addEventListener("click", function () {
        if (checkboxBtnEdit.checked) {
            checkboxBtnEdit.value = "true";
        } else {
            checkboxBtnEdit.value = "false";
        }
    });
}

let modal = document.getElementById("create-modal");
// Close create modal
modal.addEventListener("hidden.bs.modal", function () {
    let error = document.getElementsByClassName("invalid-feedback");
    let inputName = document.getElementById("name");
    let isActive = document.getElementById("createActivateCheckbox");
    let inputCreate = document.getElementById("name");
    inputCreate.value = "";
    inputName.value = "";
    isActive.checked = true;
    inputName.classList.remove("form-error");
    if (error.length > 0) {
        error[0].remove();
    }
});

$(document).ready(function () {
    $("#btn-create-word").click(function () {
        $.ajax({
            url: "/word-list/",
            type: "POST",
            data: {
                name: $("#name").val(),
                description: $("#description").val(),
                isActive: $("#createActivateCheckbox").val(),
                url: window.location.href,
            },
            json: true,
            success: function (data) {
                if (data.errors) {
                    // show modal and show error
                    $("#create-modal").modal("show");
                    let name = $("#name");
                    if ($(".invalid-feedback")) {
                        $(".invalid-feedback").remove();
                        $("#name").addClass("form-error");
                        $("#name").after(`<div class="invalid-feedback d-block">${data.errors.name}</div>`);
                    }
                } else {
                    let url = data.url;
                    window.location.href = url;
                }
            },
        });
    });
    // get all id of word list
    let wordList = document.getElementsByClassName("edit-ng");
    wordList.forEach((word) => {
        $(`#` + word.id).click(function () {
            let id = word.id.split("-")[2];
            let editBtn = document.getElementById(`edit-ng-${id}`);
            editBtn.classList.add("modal-openning");

            let name = document.getElementById("edit-name");
            let description = document.getElementById("edit-description");
            let isActive = document.getElementById("editActivateCheckbox");
            let oldData = document.getElementById(`ngRegRow-${id}`).children;
            oldData.forEach((data) => {
                if (data.className === "name") {
                    name.value = data.innerText;
                }
                if (data.className === "description") {
                    description.value = data.innerText;
                }
                if (data.className.indexOf("active") > -1 && data.children[0].classList.contains("active-" + id)) {
                    isActive.checked = true;
                    isActive.value = true;
                }
            });
            $("#edit-btn-submit").attr("data-id", id);
        });
    });
    $("#edit-btn-submit").click(function () {
        let id = $(this).attr("data-id");
        $.ajax({
            url: "/word-list/" + id + "/edit",
            type: "POST",
            data: {
                id: id,
                name: $("#edit-name").val(),
                description: $("#edit-description").val(),
                isActive: $("#editActivateCheckbox").val(),
                url: window.location.href,
            },
            json: true,
            success: function (data) {
                if (data.errors) {
                    if ($(".invalid-feedback")) {
                        $(".invalid-feedback").remove();
                        $("#edit-name").addClass("form-error");
                        $("#edit-name").after(`<div class="invalid-feedback d-block">${data.errors.name}</div>`);
                    }
                } else {
                    let url = data.url;
                    window.location.href = url;
                }
            },
        });
    });
});
