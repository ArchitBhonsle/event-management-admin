const { Admin } = require('./models/admin');

function addAdmin() {
  Admin.findOne({ username: 'hello', password: 'there' }, (err, doc) => {
    if (doc === null) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('adding admin');
      const newAdmin = new Admin({
        username: 'hello',
        password: 'there',
        name: 'hello there'
      });
      newAdmin.save();
    }
  });
}

addAdmin();
