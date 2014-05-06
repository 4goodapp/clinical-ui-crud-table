Meteor.methods({
  createNewCustomer: function(data){
    data.createdAt = new Date();
    return CustomerAccounts.insert(data);
  }
});
