//-------------------------------------------------------------
// 0. Sessions Variables

// Session.set('editing_first_name', false);
// Session.set('editing_last_name', false);
// Session.set('editing_company', false);
// Session.set('editing_address', false);
// Session.set('editing_city', false);
// Session.set('editing_county', false);
// Session.set('editing_state', false);
// Session.set('editing_zip', false);
// Session.set('editing_phone', false);
// Session.set('editing_fax', false);
// Session.set('editing_email', false);
// Session.set('editing_web', false);
//
// Session.set('editing_password', false);
// Session.set('editing_date', false);
// Session.set('editing_birthdate', false);
// Session.set('editing_month', false);
// Session.set('editing_week', false);
// Session.set('editing_time', false);
// Session.set('editing_number', false);
// Session.set('editing_color', false);
//
// Session.set('is_deleting_task', false);
//

Router.map(function(){
  this.route('customerFormPage', {
    path: '/newcustomer',
    template: 'customerFormPage',
    waitOn: function(){
      return Meteor.subscribe('customerAccounts');
    }
  });
  this.route('customerFormPage', {
    path: '/editcustomer/:id',
    template: 'customerFormPage',
    waitOn: function(){
      return Meteor.subscribe('customerAccounts');
    },
    data: function(){
      return CustomerAccounts.findOne(this.params.id);
    }
  });
});

//-------------------------------------------------------------
// B.  Helpers

// Template.customerFormPage.helpers({
//   user: function() {
//     console.log('getting user...');
//     try {
//       if (Session.get('current_task') == 'new') {
//         return {
//           "FirstName": "",
//           "LastName": "",
//           "Company": "",
//           "Address": "",
//           "City": "",
//           "County": "",
//           "State": "",
//           "ZIP": "",
//           "Phone": "",
//           "Fax": "",
//           "Email": "",
//           "Web": ""
//         };
//       } else {
//         return CustomerAccounts.findOne(Session.get('selected_user'));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });






Template.customerFormPage.events({
  'keyup #firstNameInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'FirstName': $('#firstNameInput').val()
      }
    });
  },
  'keyup #lastNameInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'LastName': $('#lastNameInput').val()
      }
    });
  },
  'keyup #companyInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Company': $('#companyInput').val()
      }
    });
  },
  'keyup #addressInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Address': $('#addressInput').val()
      }
    });
  },
  'keyup #cityInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'City': $('#cityInput').val()
      }
    });
  },
  'keyup #countyInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'County': $('#countyInput').val()
      }
    });
  },
  'keyup #stateInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'State': $('#stateInput').val()
      }
    });
  },
  'keyup #zipInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Zip': $('#zipInput').val()
      }
    });
  },
  'keyup #phoneInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Phone': $('#phoneInput').val()
      }
    });
  },
  'keyup #faxInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Fax': $('#faxInput').val()
      }
    });
  },
  'keyup #emailInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Email': $('#emailInput').val()
      }
    });
  },
  'keyup #webInput':function(){
    CustomerAccounts.update({_id: this._id}, {
      $set: {
        'Web': $('#webInput').val()
      }
    });
  },
  'click #previewCustomerButton':function(){
    Router.go('/customer/' + this._id);
  }
});


//-------------------------------------------------------------
// D. Display Readonly Value


//-------------------------------------------------------------
// E. Buttons

Template.customerFormPage.isNewTask = function() {
  if(this._id) {
    return false;
  }else{
    return true;
  }
};

Template.customerFormPage.events({
  'click #createNewCustomerButton': function() {
    console.log('creating new user...');

    try {
      // TODO:  add validation functions
      if ($('#firstNameInput').val().length) {

        Meteor.call('createNewCustomer', {
          FirstName: $('#firstNameInput').val(),
          LastName: $('#lastNameInput').val(),
          Company: $('#companyInput').val(),
          Address: $('#addressInput').val(),
          City: $('#cityInput').val(),
          County: $('#countyInput').val(),
          State: $('#stateInput').val(),
          Zip: $('#zipInput').val(),
          Phone: $('#phoneInput').val(),
          Fax: $('#faxInput').val(),
          Email: $('#emailInput').val(),
          Web: $('#webInput').val()
        }, function(error, customer) {
          console.log('error: ' + error);
          console.log('customer: ' + customer);
          Router.go('/customer/' + customer);
        });
      } else {
        Session.set("errorMessage",
          "Customer needs a name, or why bother?");
      }
    } catch (err) {
      console.log(err);
    }

    Session.set('current_task', 'view');
  },
  'click #deleteUserButton': function() {
    CustomerAccounts.remove(Session.get('selected_user'));
    Session.set('current_task', 'view');
  },
  'click #cancelDeleteButton': function() {
    Session.set('current_task', 'view');
  }
});
