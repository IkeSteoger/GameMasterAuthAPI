'use strict';

class Collection {
  constructor(dbModel){
    this.model = dbModel;
  }

  async create(data){
    try{
      const newRecord = await this.model.create(data);
      return newRecord;
    }catch(e){
      console.error('we have a modelInterface create error');
      return e;
    }
  }

  async read(id=null, options=null) {
    try{
      if(id){
        console.log('if', id, options);
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      } else if(options){
        const records = await this.model.findAll(options);
        console.log('RECORDS', records);
        return records;
      } else {
        const records = await this.model.findAll();
        return records;
      }
    }catch(e){
      console.error('we have a modelInterface read error');
      console.log(e.message);
      return e;
    }
  }

  async update(body, id) {
    try{
      const updatedRecords = await this.model.update(body, {where: {id: id}});
      return updatedRecords;
    }catch(e){
      console.error('we have a modelInterface update error');
      return e;
    }
  }

  async delete(id) {
    try {
      const deletedRecord = await this.model.findByPk(id);
      await this.model.destroy({where: {id: id}});
      return deletedRecord;
    }catch(e){
      console.error('we have a modelInterface delete error');
      return e;
    }
  }
}

module.exports = Collection;