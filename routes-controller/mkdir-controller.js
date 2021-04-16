let fs = require('fs');
let path = require('path');

exports.createMongoBackupDirectories = async ()=>{
    try {
        let mongo_backup = path.join(__dirname, '../../mongo_backup');
        let mongo_backup_compressed = path.join(__dirname, '../../mongo_backup_compressed');
        fs.exists(mongo_backup, function(exists){
          if(!exists){
            fs.mkdir(mongo_backup, function(err){
              if(err){
                console.log(`Error creating folder 'mongo_backup'`);
              }
              else{
                console.log(`Folder 'mongo_backup' created`);
              }
            });
          }
          else{
            // console.log(`Folder 'mongo_backup' already exits`);
          }
        });
      
        fs.exists(mongo_backup_compressed, function(exists){
          if(!exists){
            fs.mkdir(mongo_backup_compressed, function(err){
              if(err){
                console.log(`Error creating folder 'mongo_backup_compressed'`);
              }
              else{
                console.log(`Folder 'mongo_backup_compressed' created`);
              }
            });
          }
          else{
            // console.log(`Folder 'mongo_backup_compressed' already exits`);
          }
        });
    } catch (err) {
        console.log(err,'Internal server error in creating mongo_backup directories');
    }
}
