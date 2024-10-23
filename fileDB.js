const fs = require('fs');
const path = require('path');

class FileDB {
  constructor() {
    this.schemas = {}; 
    this.dataDir = path.join(__dirname, 'data'); 
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
    this.data = this._loadData();
  }

  _loadData() {
    if (fs.existsSync(this.filePath)) {
      const rawData = fs.readFileSync(this.filePath);
      return JSON.parse(rawData);
    } else {
      return [];
    }
  }

  _saveData() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find(record => record.id === id);
  }

  create(newRecord) {
    const newId = this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1;
    const record = { id: newId, ...newRecord, createDate: new Date() };
    this.data.push(record);
    this._saveData();
    return record;
  }

  update(id, updates) {
    const recordIndex = this.data.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found.`);
    }
    const updatedRecord = { ...this.data[recordIndex], ...updates };
    this.data[recordIndex] = updatedRecord;
    this._saveData();
    return updatedRecord;
  }

  delete(id) {
    const recordIndex = this.data.findIndex(record => record.id === id);
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found.`);
    }
    const deletedRecord = this.data.splice(recordIndex, 1);
    this._saveData();
    return deletedRecord[0].id;
  }
}

module.exports = new FileDB();
