// Get all tabs and tab navigation links
const tabItems = document.querySelectorAll('.nav-link');
const tabContentItems = document.querySelectorAll('.tab-pane');

tabItems.forEach(item => {
  item.addEventListener('click', function() {
    tabItems.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    const target = this.getAttribute('data-bs-target');
    tabContentItems.forEach(tabContent => tabContent.classList.remove('show', 'active'));
    document.querySelector(target).classList.add('show', 'active');
  });
});

const fixHelperModified = (e, tr) => {
    const $originals = tr.children();
    const $helper = tr.clone();
    $helper.children().each((index) => {
      $(this).width($originals.eq(index).width());
    });
    return $helper;
};
  
const updateIndex = (e, ui) => {
    const $sortableTableBody = $('#sortable-table-body');
    const $sortedRowsCurrent = $sortableTableBody.find('tr');
  
    const sortedRowsCurrentArray = $sortedRowsCurrent.map(function() {
      return {
        infoId: $(this).data('info-id'),
        index: $(this).index()
      };
    }).get();
  
    const newSortedRowsArray = $sortedRowsCurrent.map(function() {
      return {
        infoId: $(this).data('info-id'),
        index: $(this).index()
      };
    }).get();
  
    const rowsAreDifferent = !compareRows(sortedRowsCurrentArray, newSortedRowsArray);
    if (rowsAreDifferent) {
      $('.btn-save').css("display", "block");
    } else {
      $('.btn-save').css("display", "none");
    }
  };
  
  const compareRows = (rows1, rows2) => {
    if (rows1.length !== rows2.length) {
      return false;
    }
  
    for (let i = 0; i < rows1.length; i++) {
      if (rows1[i].infoId !== rows2[i].infoId || rows1[i].index !== rows2[i].index) {
        return false; 
      }
    }
  
    return true; 
  };
  
  $("#sortable-table-body").sortable({
    helper: fixHelperModified,
    stop: updateIndex
  }).disableSelection();

  $("tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function(event, ui) {
      
      console.log('Sortable updated:', ui);
    }
  });

const updateOrderOnServer= (infoId, newOrder) =>{
//   $.ajax({
//     url: '/updateOrder', // Replace with your server endpoint
//     method: 'POST',
//     data: { id: infoId, order: newOrder },
//     success: function(response) {
//       console.log('Order updated on server');
//     },
//     error: function(xhr, status, error) {
//       console.error('Error updating order:', error);
//     }
//   });
  }