// Get all tabs and tab navigation links
const tabItems = document.querySelectorAll('.nav-link');
const tabContentItems = document.querySelectorAll('.tab-pane');

// Add click event listener to each tab navigation link
tabItems.forEach(item => {
  item.addEventListener('click', function() {
    // Remove active class from all navigation links
    tabItems.forEach(link => link.classList.remove('active'));
    // Add active class to the clicked navigation link
    this.classList.add('active');

    // Get the target tab content ID from data-bs-target attribute
    const target = this.getAttribute('data-bs-target');
    // Remove active class from all tab content items
    tabContentItems.forEach(tabContent => tabContent.classList.remove('show', 'active'));
    // Add active class to the corresponding tab content
    document.querySelector(target).classList.add('show', 'active');
  });
});
var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(index) {
        $(this).width($originals.eq(index).width())
    });
    return $helper;
},
    updateIndex = function(e, ui) {
       console.log(ui)
    };

$("#myTable tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

    $("tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function() {}
        });