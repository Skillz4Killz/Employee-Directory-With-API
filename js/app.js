function createDirectory(index, image, fullName, username, city, country) {
  let cardSetup = '<div class="employee"><a href="#" data-toggle="modal"';
  let dataTarget = 'data-target="#myModal' + index + '">';
  let picture = '<img src="' + image + '" width="120" height="120" class="image img-circle"><div class="data">';
  let nameP = '<p class="name">' + fullName + '</p>';
  let usernameP = '<p class="username">' + username + '</p>';
  let cityP = '<p class="city">' + city + ', ' + country + '</p></div></a></div>';

  return cardSetup + dataTarget + picture + nameP + usernameP + nameP
}

function leftOrRight() {
  $('.modal').each(function(){
    let currentModal = $(this);
    //click next
    currentModal.find('.btn-next').click(function(){
      currentModal.modal('hide');
      currentModal.closest('.modal').nextAll('.modal').first().modal('show'); 
    });
    //click prev
    currentModal.find('.btn-prev').click(function(){
      currentModal.modal('hide');
      currentModal.closest('.modal').prevAll('.modal').first().modal('show');
    });
  });
}

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

        fullWrapper = createDirectory(index, image, fullName, username, city, country);

        fullModal = createModal(index, image, fullName, email, city, username, telephone, address, birthday);

        $('#wrapper').append(fullWrapper);
        $('#wrapper').append(fullModal);
        // if(name.length > 15) {
        //   $('.name').style.fontSize = '1.1rem';
        // } 
        // if(city.length > 15) {
        //     $('.city').style.fontSize = '1rem';
        // }
    })
  }
});



//console.log('');