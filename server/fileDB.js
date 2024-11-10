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
    console.log(filePath);
    
    return new Table(filePath, this.schemas[tableName]);
  }
}

class Table {
  constructor(filePath, schema) {
    this.filePath = filePath;
    this.schema = schema;
  }

  _loadData() {
    try {
      if (fs.existsSync(this.filePath)) {
        const rawData = fs.readFileSync(this.filePath);
        return JSON.parse(rawData);
      } else {
        return [];
      }
    } catch (err) {
      console.error('Error loading data:', err);
      return [];
    }
  }

  _saveData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving data:', err);
    }
  }

  getAll() {
    return this._loadData();
  }

  getById(id) {
    const data = this._loadData()
    return data.find(record => record.id === id)
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
    const data = this._loadData()
    const recordIndex = data.findIndex(record => record.id === id)
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found.`)
    }
    const updatedRecord = { ...data[recordIndex], ...updates }
    data[recordIndex] = updatedRecord
    this._saveData(data)
    return updatedRecord
  }

  delete(id) {
    const data = this._loadData()
    const recordIndex = data.findIndex(record => record.id === id)
    if (recordIndex === -1) {
      throw new Error(`Record with id ${id} not found.`)
    }
    const deletedRecord = data.splice(recordIndex, 1);
    this._saveData(data)
    return deletedRecord[0].id
  }
}

module.exports = new FileDB();
