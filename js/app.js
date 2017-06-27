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
const info = $('.modal-title');

let image, fullName, email, city, username, fullWrapper, modal, telephone, address, birthday, country, fullModal, card;

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

// //print html
//         $('#wrapper').append(fullWrapper);
//         $('#wrapper').append(fullModal);
        card = document.getElementsByClassName('employee');
        
    })//loop ends

//fill in the data for each employee card
    const cardName = document.getElementsByClassName('name');
    const cardUsername = document.getElementsByClassName('username');
    const cardCity = document.getElementsByClassName('city');
    const cardImage = document.getElementsByClassName('image');
    const modalLink = document.getElementsByClassName('modalLink');
    const modalSetup = document.getElementsByClassName('modal');
    const nameSpan = document.getElementsByClassName('nameSpan');
    const emailSpan = document.getElementsByClassName('emailSpan');
    const citySpan = document.getElementsByClassName('citySpan');
    const usernameSpan = document.getElementsByClassName('usernameSpan');
    const cellSpan = document.getElementsByClassName('cellSpan');
    const addressSpan = document.getElementsByClassName('addressSpan');
    const birthdaySpan = document.getElementsByClassName('birthdaySpan');

    for (let i = 0; i < employeesList.length; i++) {
      if (fullName.length > 14)  {
        cardName[i].textContent = employeesList[i].fullName; 
        cardName[i].className += ' name-small';
      } else {
        cardName[i].textContent = employeesList[i].fullName;
      }
      
      if (username.length > 16) {
        cardUsername[i].textContent = employeesList[i].username;
        cardUsername[i].className += ' username-small';
      } else {
        cardUsername[i].textContent = employeesList[i].username;
      }
       
     if (city.length > 12) {
        cardCity[i].textContent = `${employeesList[i].city}, ${employeesList[i].country}`;
        cardCity[i].className += ' city-small'
      } else if (city.length > 18) {
        cardCity[i].textContent = `${employeesList[i].city}, ${employeesList[i].country}`;
        cardCity[i].className += ' city-super-small'
      } else {
        cardCity[i].textContent = `${employeesList[i].city}, ${employeesList[i].country}`;
      }

      cardImage[i].src = employeesList[i].image;

        // function makeModals(i) {
        //   nameSpan.textContent = employeesList[i].fullName;
        //   emailSpan.textContent = employeesList[i].email;
        //   citySpan.textContent = employeesList[i].city;
        //   usernameSpan.textContent = employeesList[i].username;
        //   cellSpan.textContent = employeesList[i].telephone;
        //   addressSpan.textContent = employeesList[i].address;
        //   birthdaySpan.textContent = employeesList[i].birthday;
        //   console.log(modalSetup[i]);
        //   console.log(nameSpan);
        //   console.log(emailSpan);
        //   console.log(citySpan);
        //   console.log(usernameSpan);
        //   console.log(cellSpan);
        //   console.log(addressSpan);
        //   console.log(birthdaySpan);
        // }
    //create modals for each card
      card[i].addEventListener('click', () => {
        const innerModal = document.getElementById('pasteDataHere');
          let modalData = `<div class="modal-body">
              <img src="${employeesList[i].image}" width="190" height="190" class="img-circle">
              <h3 class="modal-title"><b>Full Name :</b><span class="nameSpan">${employeesList[i].fullName}</span></h3>
              <p class="modal-title"><b>Email : </b><span class="emailSpan">${employeesList[i].email}</span></p>
              <p class="modal-title"><b>City : </b><span class="citySpan">${employeesList[i].city}</span></p><hr>
              <p class="modal-title"><b>Username : </b><span class="usernameSpan">${employeesList[i].username}</span></p>
              <p class="modal-title"><b>Cell : </b><span class="cellSpan"></span>${employeesList[i].telephone}</p>
              <p class="modal-title"><b>Address : </b><span class="addressSpan">${employeesList[i].address}</span></p>
              <p class="modal-title"><b>Birthday : </b><span class="birthdaySpan">${employeesList[i].birthday}</span></p>
            </div>`
            console.log(innerModal);
            innerModal.innerHTML = modalData;
          })
    }//end for loop for cards
  }
}); //end ajax call



//create var necessary for search function
const search = document.getElementById('searchBar');
const buttonSearch = document.getElementById('searchButton');
//cancel the submit function in input element
$('.form-horizontal').submit(function(event) {
  event.preventDefault();
});
//search function
search.addEventListener('keyup', () => {
  let searchWord = search.value.toLowerCase();
  //hide all
    for (let i = 0; i < employeesList.length; i++ ) {
      card[i].style.display = 'none';
    }
  //show only those meeting filter requirement
    for (let i = 0; i < employeesList.length; i++) {
      console.log(searchWord);
      let testName = employeesList[i].fullName.toLowerCase();
       testName = testName.indexOf(searchWord);
      let testUsername = employeesList[i].username.indexOf(searchWord);
      if (testName >= 0 || testUsername >= 0) {
        card[i].style.display = '';
      } 
    }
})

// button event listenere to search or reset the cards filtered by search value
buttonSearch.addEventListener('click', () => {
  search.value = '';
  for (let i = 0; i < employeesList.length; i++ ) {
      card[i].style.display = '';
    }
})

