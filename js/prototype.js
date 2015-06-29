$(function (){

  $.getJSON('js/data.json', function (data){
    window.claims = data;

    setup();
  });

        // "advocate": "Guy Mills",
        // "date": "2015-05-30 16:57:56.791896",
        // "number": "C-95385",
        // "type": "Fixed fee",
        // "value": 54738.057174052956



  var populateTable = function ( rows ){
      $('.claim-list-table tbody tr').remove();
      var $tbody = $('.claim-list-table tbody');

      for( var i=0; i<rows.length; i++ ){
        var $tr = $('<tr>');
        $tr.append($( "<td>" + _.escape( rows[i].number ) + "</td"> ));
        $tr.append($( "<td>" + _.escape( rows[i].advocate ) + "</td"> ));
        $tr.append($( "<td>" + _.escape( rows[i]['type'] ) + "</td"> ));
        $tr.append($( "<td>" + _.escape( rows[i]['value'] ) + "</td"> ));
        $tr.append($( "<td>" + _.escape( rows[i]['date'] ) + "</td"> ));
      }
  }


  var setup = function (){
    var $typeSelectors = $('.claims-type-selector input');

    $typeSelectors.click(function ( event ){
      var $type = $(event.target);
      console.log($type.val());

      var selection = _.where(window.claims, {type: $type.val()}).slice(0, 40);
      console.log(selection);
    });



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
  }

});
