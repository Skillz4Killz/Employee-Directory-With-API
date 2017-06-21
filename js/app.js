$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    let employees = data.results;
    let image, fullName, email, city, username, fullWrapper, modal, telephone, address, birthday;
    console.log(employees);
    function capitalize(name) {
    	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    $.each(employees, function (index, value) {
    	fullName = capitalize(employees[index].name.first) + ' ' + capitalize(employees[index].name.last);
    	email = employees[index].email;
      city = capitalize(employees[index].location.city);
      username = employees[index].login.username;
    	image = employees[index].picture.large;
      telephone = employees[index].cell;
      address = employees[index].location.street + ' ' + city + ' ' + employees[index].location.state + ' ' + employees[index].location.postcode ;
      birthday = employees[index].dob;

        fullWrapper = '<div class="employee"><a href="#" data-toggle="modal" data-target="#myModal' + 
        index + '"><img  src="' + image + '" width="120" height="120" class="image img-circle"></a><div class="data">' +
        '<p class="name">' + fullName + '</p><p class="email">' + email + '</p><p class="city" >' + city +
        '</p><p class="username">' + username + '</p></div></div>'
        modal = '<div class="modal fade" id="myModal' + index + 
        '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">' +
        '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button"' +
        'class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="false">&times;</span>' +
        '</button>' +
        '</div><div class="modal-body"><img src="' + image + '" width="190" height="190" class="img-circle">' +
        '<h3 class="modal-title" id="exampleModalLabel"><b>Full Name :</b> ' + fullName + '</h3>' +
        '<p class="modal-title" id="exampleModalLabel"><b>Email :</b> ' + email + '</p>' +
        '<p class="modal-title" id="exampleModalLabel"><b>City :</b> ' + city + '</p>' +
        '<p class="modal-title" id="exampleModalLabel"><b>Username :</b> ' + username + '</p>' +
        '<hr>' +
        '<p class="modal-title" id="exampleModalLabel"><b>Cell :</b> ' + telephone + '</p>' +
        '<p class="modal-title" id="exampleModalLabel"><b>Address :</b> ' + address + '</p>' +
        '<p class="modal-title" id="exampleModalLabel"><b>DOB :</b> ' + birthday +

        '</p></div><div class="modal-footer"><button type="button"' +
        'class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button"' +
        'class="btn btn-primary" id="alertButton">Send Alert</button></div></div></div></div>';
        $('#wrapper').append(fullWrapper);
        $('#wrapper').append(modal);

    
        
    })
  }
});

//console.log('');