$(function (){
  var $selectAll = $('.select-all-button');

  $selectAll.click(function ( event ){
    event.preventDefault();

    if( !$selectAll.hasClass('select-none') ){
      console.log($('.claim-list-table input'));
      $('.claim-list-table input').prop('checked', true);
      $selectAll.addClass('select-none').html('Select none');
    }else{
      $('.claim-list-table input').prop('checked', false);
      $selectAll.removeClass('select-none').html('Select all');
    }
  });

});
