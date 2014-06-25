
Router.map(function(){
  this.route('customerFormPage', {
    path: '/newcustomer',
    template: 'customerFormPage',
    waitOn: function(){
      return Meteor.subscribe('customers');
    }
  });
  this.route('customerFormPage', {
    path: '/editcustomer/:id',
    template: 'customerFormPage',
    waitOn: function(){
      return Meteor.subscribe('customers');
    },
    data: function(){
      return Customers.findOne(this.params.id);
    }
  });
});

//-------------------------------------------------------------


Template.customerFormPage.events({
  'keyup #firstNameInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'FirstName': $('#firstNameInput').val()
      }
    });
  },
  'keyup #lastNameInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'LastName': $('#lastNameInput').val()
      }
    });
  },
  'keyup #companyInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Company': $('#companyInput').val()
      }
    });
  },
  'keyup #addressInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Address': $('#addressInput').val()
      }
    });
  },
  'keyup #cityInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'City': $('#cityInput').val()
      }
    });
  },
  'keyup #countyInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'County': $('#countyInput').val()
      }
    });
  },
  'keyup #stateInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'State': $('#stateInput').val()
      }
    });
  },
  'keyup #zipInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Zip': $('#zipInput').val()
      }
    });
  },
  'keyup #phoneInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Phone': $('#phoneInput').val()
      }
    });
  },
  'keyup #faxInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Fax': $('#faxInput').val()
      }
    });
  },
  'keyup #emailInput':function(){
    Customers.update({_id: this._id}, {
      $set: {
        'Email': $('#emailInput').val()
      }
    });
  },
  'keyup #webInput':function(){
    Customers.update({_id: this._id}, {
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

    //Session.set('current_task', 'view');
  },
  'click #deleteUserButton': function() {
    Customers.remove(Session.get('selected_user'));
    //Session.set('current_task', 'view');
  },
  'click #cancelDeleteButton': function() {
    Router.go('/customers');
    //Session.set('current_task', 'view');
  }
});
