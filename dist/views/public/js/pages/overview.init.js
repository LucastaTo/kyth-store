document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".btn-link").forEach((function(e){e.addEventListener("click",(function(){var e=this.getAttribute("data-target"),t=document.querySelector(e),s=this.querySelector(".icon");t.classList.contains("show")?(t.classList.remove("show"),s.classList.remove("bx-chevron-up"),s.classList.add("bx-chevron-down")):(document.querySelectorAll(".collapse").forEach((function(e){if(e!==t&&e.classList.contains("show")){e.classList.remove("show");var s=document.querySelector('[data-target="#'+e.id+'"]').querySelector("i");s.classList.remove("bx-chevron-up"),s.classList.add("bx-chevron-down")}})),t.classList.add("show"),s.classList.remove("bx-chevron-down"),s.classList.add("bx-chevron-up"))}))}))}));