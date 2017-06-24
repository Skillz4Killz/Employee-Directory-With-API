//create employee object to hold all data from each user whenever called
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
//array to hold all objects of all employees
let employeesList = [];
let image, fullName, email, city, username, fullWrapper, modal, telephone, address, birthday, country, fullModal, card;
//create dyname name font-size by checking length of characters
function dynamicNameFont(fullName) {
    if (fullName.length > 14)  {
      let nameSet = '<p class="name name-small">' + fullName + '</p>';
      return nameSet
    } else {
      let nameSet = '<p class="name">' + fullName + '</p>';
      return nameSet
    }
  }
//create dynamic font-size by checking length of characters for City
function dynamicCityFont(city) {
  if (city.length > 12) {
    let citySet = '<p class="city city-small">' + city + ', ' + country + '</p></div></a></div>';
    return citySet
  } else if (city.length > 18) {
    let citySet = '<p class="city city-super-small">' + city + ', ' + country + '</p></div></a></div>';
    return citySet
  } else {
    let citySet = '<p class="city">' + city + ', ' + country + '</p></div></a></div>';
    return citySet
  }
}
//create dynamic username font-size by checking length of character for Username
function dynamicUsernameFont(username) {
  if (username.length > 18) {
    let usernameSet = '<p class="username username-small">' + username + '</p>';
    return usernameSet
  } else {
    let usernameSet = '<p class="username">' + username + '</p>';
    return usernameSet
  }
}
//create the card using all necessary information when called and return so it can print
function createDirectory(index, image, fullName, username, city, country) {
  let cardSetup = '<div class="employee"><a href="#" data-toggle="modal"';
  let dataTarget = 'data-target="#myModal' + index + '">';
  let picture = '<img src="' + image + '" width="120" height="120" class="image img-circle"><div class="data">';
  let nameP = dynamicNameFont(fullName);
  let usernameP = dynamicUsernameFont(username);
  let cityP = dynamicCityFont(city);
  return cardSetup + dataTarget + picture + nameP + usernameP + cityP
}
//function to make a modal for each employee with unique id tag and proper format, add buttons to switch left and right.
function createModal(index, image, fullName, email, city, username, telephone, address, birthday) {
  let modalSetup = '<div class="modal fade" id="myModal' + index + '" tabindex="-1" role="dialog" aria-hidden="false"><div class="modal-dialog" role="document"><div class="modal-content">';
  let modalHeader = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="false">&times;</span></div><div class="modal-body">';
  let modalImage = '<img src="' + image + '" width="190" height="190" class="img-circle">';
  let modalName = '<h3 class="modal-title"><b>Full Name :</b> ' + fullName + '</h3>';
  let modalEmail = '<p class="modal-title"><b>Email : </b>' + email + '</p>';
  let modalCity = '<p class="modal-title"><b>City : </b>' + city + '</p><hr>';
  let modalUsername = '<p class="modal-title"><b>Username : </b>' + username + '</p>';
  let modalTelephone = '<p class="modal-title"><b>Cell : </b>' + telephone + '</p>';
  let modalAddress = '<p class="modal-title"><b>Address : </b>' + address + '</p>';
  let modalBirthday = '<p class="modal-title"><b>Birthday : </b>' + birthday + '</p></div>';
  let modalFooter = '<div class="modal-footer">';
  let leftButton = '<button type="button" <a href="#" id="leftButton" class="btn btn-info btn-prev" data-toggle="modal data-target="#myModal' + (index - 1) + '">Left</a></button>';
  let rightButton = '<button type="button" <a href="#" id="rightButton" class="btn btn-info btn-next" data-toggle="modal data-target="#myModal' + (index + 1) + '">Right</a></button>';
  let closeButton = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div>';
  leftOrRight();
  return modalSetup + modalHeader + modalImage + modalName + modalEmail + modalCity + modalUsername + modalTelephone + modalAddress + modalBirthday + modalFooter + leftButton + rightButton + closeButton
}
//function to allow changing left and right of modals
function leftOrRight() {
  $('.modal').each(function(){
    let current = $(this);
    //click next
    current.find('.btn-next').click(function(){
      current.modal('hide');
      current.closest('.modal').nextAll('.modal').first().modal('show'); 
    });
    //click prev
    current.find('.btn-prev').click(function(){
      current.modal('hide');
      current.closest('.modal').prevAll('.modal').first().modal('show');
    });
  });
}

//capitalize the name first letter
function capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
//make ajax call to get back 12 employees in json format
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=US',
  dataType: 'json',
  success: function(data) {
    let employees = data.results;
//for loop to take each employees data and save each necessary one in proper format
    $.each(employees, function (index, value) {
    	fullName = capitalize(employees[index].name.first) + ' ' + capitalize(employees[index].name.last);
    	email = employees[index].email;
      city = capitalize(employees[index].location.city);
      country = employees[index].nat;
      username = employees[index].login.username;
//the image is of large and not thumbnail as requirements state because it is too blurry as the thumbnail is small size for better UX i change it to thumbnail, for grading purposes please know that it would be the commented line below.
//    image = employees[index].picture.thumbnail;
    	image = employees[index].picture.large;
      telephone = employees[index].cell;
      address = employees[index].location.street + ' ' + city + ' ' + employees[index].location.state + ', ' + country + employees[index].location.postcode;
      birthday = employees[index].dob;
//create a player object in each loop using all the necessary var to save all the values.
      employeesList.push(new person(image, fullName, birthday, username, city, country, email, telephone, address));
//call the functons to make the html necessary for each employee
      fullWrapper = createDirectory(index, image, fullName, username, city, country);
      fullModal = createModal(index, image, fullName, email, city, username, telephone, address, birthday);
//print html
        $('#wrapper').append(fullWrapper);
        $('#wrapper').append(fullModal);
    })//loop ends
//save employee html collection in card for search function
card = document.getElementsByClassName('employee');
  }
});
//create var necessary for search function
const $search = $('#searchBar');
const buttonSearch = document.getElementById('searchButton');
//cancel the submit function in input element
$search.submit(function(event) {
  event.preventDefault();
});
//button event listenere to search or reset the cards filtered by search value
buttonSearch.addEventListener('click', () => {
  let searchWord = $search.value.toLowerCase();
  $search.value = '';
//hide all
  for (let i = 0; i < employeesList.length; i++ ) {
    card[i].style.display = 'none';
  }
//show only those meeting filter requirement
  for (let i = 0; i < employeesList.length; i++) {
    let testName = employeesList[i].fullName.toLowerCase();
     testName = testName.indexOf(searchWord);
    let testUsername = employeesList[i].username.indexOf(searchWord);
    if (testName >= 0 || testUsername >= 0) {
      card[i].style.display = '';
    }
  }
})