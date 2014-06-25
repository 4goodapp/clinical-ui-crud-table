Meteor.methods({
  createNewCustomer: function(data){
    data.createdAt = new Date();
    return Customers.insert(data);
  }
});
