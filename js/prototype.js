$(function (){

  $.getJSON('js/data.json', function (data){
    window.claims = data;

    setup();
    populateTable(_.where(window.claims, {type: 'Guilty plea'}).slice(0, 40));
  });

  var populateTable = function ( rows ){
      $('.claim-list-table tbody tr').remove();
      var $tbody = $('.claim-list-table tbody');

      for( var i=0; i<rows.length; i++ ){
        var $tr = $('<tr>');
        var rowDate = new Date(rows[i]['date']);
        var rowDateStr = [rowDate.getDate(), rowDate.getMonth(), rowDate.getFullYear()].join('/');

        var rowValueStr = '£' + rows[i].value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

        $tr.append('<td><input type="checkbox" /></td>')
        $tr.append($( "<td>" + _.escape( rows[i].number   ) + "</td>" ));
        $tr.append($( "<td>" + _.escape( rows[i].advocate ) + "</td>" ));
        $tr.append($( "<td>" + _.escape( rows[i]['type']  ) + "</td>" ));
        $tr.append($( "<td>" + _.escape( rowDateStr       ) + "</td>" ));
        $tr.append($( "<td>" + _.escape( rowValueStr      ) + "</td>" ));

        $tbody.append($tr);
      }
  }

  var setup = function (){
    var $typeSelectors = $('.claims-type-selector input');

    $typeSelectors.click(function ( event ){
      var $type = $(event.target);

      if( $type.val() == 'All' ){
        var selection = window.claims.slice(0, 40);
      }else{
        var selection = _.where(window.claims, {type: $type.val()}).slice(0, 40);
      }

      populateTable(selection);
    });


    $('.claim-list-table').on('click', 'tbody tr', function ( event ){
      var $target = $(event.target);
      var $input = $target.closest('tr').find('input');
      $input.prop('checked', !$input.prop('checked'));
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
      var $summary = $('.allocation-summary');
      var $sump = $summary.find('p');

      $sump.html('');

      var type = $('.claims-type-selector input:checked').val()

      var caseworker = $('.caseworkers option:selected').html();
      var office = $('.offices option:selected').html();

      var number = $("#assing-count").val() > 0
                    ? $("#assing-count").val()
                    : $('.claim-list-table input:checked').length;

      $sump.html(["Allocated ", number, type, "claims to", caseworker, "in", office].join(' '));

      $("#assing-count").val('');

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
