document.addEventListener("DOMContentLoaded", function() {
  // Add event listeners for each button
  var buttons = document.querySelectorAll('.btn-link');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var target = this.getAttribute('data-target');
      var element = document.querySelector(target);
      var icon = this.querySelector('.icon');

      if (element.classList.contains('show')) {
        element.classList.remove('show');
        icon.classList.remove('bx-chevron-up');
        icon.classList.add('bx-chevron-down');
      } else {
        // Close all other collapsible panels
        var collapses = document.querySelectorAll('.collapse');
        collapses.forEach(function(collapse) {
          if (collapse !== element && collapse.classList.contains('show')) {
            collapse.classList.remove('show');
            // Find the button associated with this collapse
            var buttonToClose = document.querySelector('[data-target="#' + collapse.id + '"]');
            var iconToClose = buttonToClose.querySelector('i');
            iconToClose.classList.remove('bx-chevron-up');
            iconToClose.classList.add('bx-chevron-down');
          }
        });
        // Show the clicked panel
        element.classList.add('show');
        icon.classList.remove('bx-chevron-down');
        icon.classList.add('bx-chevron-up');
      }
    });
  });
});
