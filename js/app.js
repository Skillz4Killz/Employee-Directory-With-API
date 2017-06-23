function person(url, fullName, dob, user, place, homeland, mail, cell, home) {
    this.image = url;
    this.fullName = fullName;
    this.birthday = dob;
    this.username = user;
    this.city = place;
    this.country = homeland;
    this.email = mail;
    this.telephone = cell;
    this.address = home;
}

let employeesList = [];
let searchArray = [];

function createDirectory(index, image, fullName, username, city, country) {
  let cardSetup = '<div class="employee"><a href="#" data-toggle="modal"';
  let dataTarget = 'data-target="#myModal' + index + '">';
  let picture = '<img src="' + image + '" width="120" height="120" class="image img-circle"><div class="data">';
  let nameP = '<p class="name">' + fullName + '</p>';
  let usernameP = '<p class="username">' + username + '</p>';
  let cityP = '<p class="city">' + city + ', ' + country + '</p></div></a></div>';

  return cardSetup + dataTarget + picture + nameP + usernameP + cityP
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    let employees = data.results;
    let image, fullName, email, city, username, fullWrapper, modal, telephone, address, birthday, country;
    
    function capitalize(name) {
    	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    $.each(employees, function (index, value) {
    	fullName = capitalize(employees[index].name.first) + ' ' + capitalize(employees[index].name.last);
    	email = employees[index].email;
      city = capitalize(employees[index].location.city);
      country = employees[index].nat;
      username = employees[index].login.username;
    	image = employees[index].picture.thumbnail;
      telephone = employees[index].cell;
      address = employees[index].location.street + ' ' + city + ' ' + employees[index].location.state + ', ' + country + employees[index].location.postcode;
      birthday = employees[index].dob;

      searchArray.push(fullName.toLowerCase());
      searchArray.push(username.toLowerCase());
      employeesList.push(new person(image, fullName, birthday, username, city, country, email, telephone, address));

      fullWrapper = createDirectory(index, image, fullName, username, city, country);

        $('#wrapper').append(fullWrapper);
        
    })

    // function leftOrRight() {
//   $('.modal').each(function(){
//     let currentModal = $(this);
//     //click next
//     currentModal.find('.btn-next').click(function(){
//       currentModal.modal('hide');
//       currentModal.closest('.modal').nextAll('.modal').first().modal('show'); 
//     });
//     //click prev
//     currentModal.find('.btn-prev').click(function(){
//       currentModal.modal('hide');
//       currentModal.closest('.modal').prevAll('.modal').first().modal('show');
//     });
//   });
// }

    // const $selection = $('#selectbasic');
    // const $search = $('#searchBar');
    // const $buttonSearch = $('#searchButton');
    // // const $employee = $('.employee');

    // $buttonSearch.click(function(event) {
    //   let searchWord = $search.val().toLowerCase();
    //   $search.val('');
    //   let $employee = $('.emoloyee');
    //   $.each(searchArray, function ( index, element ) {
    //     let testString = searchArray.indexOf(searchWord);
    //     console.log(testString);
    //     if (testString < 0) {
    //       console.log('inside if');
    //       $employee.hide();
    //     }
    //   });
    // }); 
  }
});

//search feature $.inArray(searchWord, searchArray)



//console.log('');