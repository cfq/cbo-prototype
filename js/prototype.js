$(function (){
  var $selectAll = $('.select-all-button');

  $selectAll.click(function ( event ){
    event.preventDefault();

    if( !$selectAll.hasClass('select-none') ){
      $('.claim-list-table input').prop('checked', true);
      $selectAll.addClass('select-none').html('Select none');
    }else{
      $('.claim-list-table input').prop('checked', false);
      $selectAll.removeClass('select-none').html('Select all');
    }
  });

  $('.allocate-button').click(function ( event ){
    $('.allocation-summary').removeClass('hidden');
  });

  var $highValue = $('.high-value-only');

  $highValue.click(function ( event ){
    event.preventDefault();

    if( !$highValue.hasClass('selected') ){
      $highValue.addClass('selected');
      $highValue.html('Show claims for all values');
    }else{
      $highValue.removeClass('selected');
      $highValue.html('Show only high value claims');
    }
  });

});
