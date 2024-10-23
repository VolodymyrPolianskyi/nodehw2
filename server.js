const fileDB = require('./fileDB');

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema('newspost', newspostSchema);

const newspostTable = fileDB.getTable('newspost');

const createdNewspost = newspostTable.create({
  title: 'У зоопарку Чернігова лисичка народила лисеня',
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!"
});
console.log('Created post:', createdNewspost);

const updatedNewspost = newspostTable.update(createdNewspost.id, { title: 'Маленька лисичка' });
console.log('Updated news:', updatedNewspost);

const newsposts = newspostTable.getAll();
console.log('Every news:', newsposts);

const newspostById = newspostTable.getById(createdNewspost.id);
console.log('News with Id: ', newspostById);

// const deletedId = newspostTable.delete(createdNewspost.id);
// console.log(`Deleted post id: `, deletedId);
