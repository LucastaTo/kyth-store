document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for each button
    var buttons = document.querySelectorAll('.btn-link');
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        var target = this.getAttribute('data-target');
        var element = document.querySelector(target);
        if (element.classList.contains('show')) {
          element.classList.remove('show');
        } else {
          // Close all other collapsible panels
          var collapses = document.querySelectorAll('.collapse');
          collapses.forEach(function(collapse) {
            if (collapse !== element && collapse.classList.contains('show')) {
              collapse.classList.remove('show');
            }
          });
          // Show the clicked panel
          element.classList.add('show');
        }
      });
    });
  });

// Handle button delete
let userList = document.getElementById("userList").dataset.test;
let userRow;
let params;
if (userList)
    JSON.parse(userList).forEach((id) => {
        params = document.getElementById(`sa-params-${id}`);
        updateParams = document.getElementById(`btn-update-${id}`);
        forms = document.getElementById(`form-delete`);
        formActive = document.getElementById("form-active");
        userRow = document.getElementsByClassName(`user-${id}`);
        if (params && userRow) {
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
                        getHrefInput(forms, JSON.parse(userList));
                        forms.method = "POST";
                        forms.action = `/users-list/${id}/delete`;
                        forms.submit();
                    }
                });
            });
        }

        if (updateParams) {
            if (!formActive) {
                formActive = document.createElement("form");
                formActive.id = "form-active";
                formActive.style.display = "none";
                updateParams.appendChild(formActive);
            }
            updateParams.addEventListener("click", function () {
                getHrefInput(formActive);
                formActive.method = "POST";
                formActive.action = `/users-list/${id}/active`;
                formActive.submit();
            });
        }
    });
