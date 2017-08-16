'use strict'

$(function() {

  const $warning = $('.warning');
  const $succes = $('.success');

  const $brand = $('.brand');
  const $color = $('.color');
  const $size = $('.size');
  const $price = $('.price');
  const $stockN = $('.nStock');

  const $newBrand = $('.newBrand');
  const $newColor = $('.newColor');
  const $newSize = $('.newSize');
  const $newPrice = $('.newPrice');
  const $newStock = $('.newStock');

  $('.collapsed').on('click', function() {
    $('.collapse').slideToggle();
  });

  function filterShoes(data){
    if (data) {
      $.each(data, function(i, shoe) {
        $('#brand').append(shoe.brand + '<br>');
        $('#color').append(shoe.color + '<br>');
        $('#size').append('US/' + shoe.size + '<br>');
        $('#price').append('R ' + shoe.price + '<br>');
        $('#stockN').append(shoe.in_stock + '<br>');
      });
    }
  }

  $.ajax({
    type: 'GET',
    url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
    success: function(data) {
      // stock = JSON.stringify(data);
      filterShoes(data);
      console.log('data retrieved');
    },
    error: function() {
      alert('error loading the stock');
    }
  });

  $('.addBtn').on('click', function() {

    var nStock = {
      brand: $newBrand.val(),
      size: $newSize.val(),
      color: $newColor.val(),
      in_stock: $newStock.val(),
      price: $newPrice.val()
    };

    // var nStock = JSON.stringify(nStock);
    // alert(nStock);

    if ($newBrand.val() !== '' && $newSize.val() !== '' && $newColor.val() !== '' && $newStock.val() !== '' && $newPrice.val() !== '') {
      $.ajax({
        type: 'POST',
        url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
        data: JSON.stringify(nStock),
        contentType: "application/json",
      }).done(function(data) {
        // alert(data);
        document.querySelector('.newBrand').value = "";
        document.querySelector('.newColor').value = "";
        document.querySelector('.newSize').value = "";
        document.querySelector('.newPrice').value = "";
        document.querySelector('.newStock').value = "";
        location.reload();
      });
    } else {
      document.querySelector('.condition').innerHTML = '<div class="alert alert-danger warning">Please enter valid stock values!</div>';
    }

  });


  $('.searchBtn').on('click', function() {

    const $searchItem = $('.searchItem').val().toLowerCase();

    if ($searchItem !== "") {
      document.querySelector('#brand').innerHTML = "";
      document.querySelector('#color').innerHTML = "";
      document.querySelector('#size').innerHTML = "";
      document.querySelector('#price').innerHTML = "";
      document.querySelector('#stockN').innerHTML = "";
      $.ajax({
        type: 'GET',
        url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/brand/' + $searchItem
      }).done(function(data) {
        filterShoes(data)
      });

      $.ajax({
        type: 'GET',
        url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/size/' + $searchItem
      }).done(function(data) {
        filterShoes(data)
      });
    } else {
      alert('Shoe not available!');
    }

  });

  $('.seeAllBtn').on('click', function() {

    document.querySelector('#brand').innerHTML = "";
    document.querySelector('#color').innerHTML = "";
    document.querySelector('#size').innerHTML = "";
    document.querySelector('#price').innerHTML = "";
    document.querySelector('#stockN').innerHTML = "";

    $.ajax({
      type: 'GET',
      url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
      success: function(data) {
        // stock = JSON.stringify(data);
        filterShoes(data);
        console.log('data retrieved');
      },
      error: function() {
        alert('error loading the stock');
      }
    });

  });

});