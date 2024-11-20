const fs = require('fs');
const path = require('path');

class FileDB {
  constructor() {
    this.schemas = {};
    this.dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir);
    }
  }

  registerSchema(tableName, schema) {
    if (this.schemas[tableName]) {
      throw new Error(`Schema for table "${tableName}" is already registered.`);
    }
    this.schemas[tableName] = schema;
  }

  getTable(tableName) {
    if (!this.schemas[tableName]) {
      throw new Error(`Schema for table "${tableName}" is not registered.`);
    }
    const filePath = path.join(this.dataDir, `${tableName}.json`);
    return new Table(filePath, this.schemas[tableName]);
  }
}

class Table {
  constructor(filePath, schema) {
    this.filePath = filePath;
    this.schema = schema;
  }

  _loadData() {
    if (fs.existsSync(this.filePath)) {
      const rawData = fs.readFileSync(this.filePath);
      return JSON.parse(rawData);
    }
    return [];
  }

  _saveData(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  getAll() {
    return this._loadData();
  }

  getById(id) {
    return this._loadData().find(record => record.id === id);
  }

  create(newRecord) {
    const data = this._loadData();
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const record = { id: newId, ...newRecord, createDate: new Date() };
    data.push(record);
    this._saveData(data);
    return record;
  }

  update(id, updates) {
    const data = this._loadData();
    const index = data.findIndex(record => record.id === id);
    if (index === -1) throw new Error(`Record with id ${id} not found.`);
    data[index] = { ...data[index], ...updates };
    this._saveData(data);
    return data[index];
  }

  delete(id) {
    const data = this._loadData();
    const index = data.findIndex(record => record.id === id);
    if (index === -1) throw new Error(`Record with id ${id} not found.`);
    const [deleted] = data.splice(index, 1);
    this._saveData(data);
    return deleted;
  }
}

const fileDB = new FileDB();

const newspostSchema = {
  id: Number,
  title: String,
  genre: String,
  text: String,
  isPrivate: Boolean,
  createDate: Date
};
fileDB.registerSchema('newspost', newspostSchema);

module.exports = fileDB;
