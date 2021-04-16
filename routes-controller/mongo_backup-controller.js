let fs = require('fs');
let archiver = require('archiver');
let _ = require('lodash');
let exec = require('child_process').exec;

let path = require('path');
let constant = require('../constants/constant');

let aws = require('aws-sdk');
let s3 = new aws.S3({
    accessKeyId: constant.awsCredentials.accessKeys.accessKeyId,
    secretAccessKey: constant.awsCredentials.accessKeys.secretAccessKey
});

let dbOptions =  {
    user: '',
    pass: '',
    host: 'localhost',
    port: 27017,
    database: ' testdb',
    autoBackup: true, 
    removeOldBackup: true,
    removeOldCompressedFile: true,
    keepLastDaysBackup: 1,
    autoBackupPath: path.join(__dirname, '../../mongo_backup/backup_'), // i.e. /var/database-backup/
    autoComressedBackupPath: path.join(__dirname, '../../mongo_backup_compressed/') // i.e. /var/database-backup/
}; // Local db path

// let dbOptions =  {
//     user: ' testdb',
//     pass: ' testdb@!@2019',
//     host: '54.71.18.74',
//     port: 27017,
//     database: ' testdb',
//     autoBackup: true, 
//     removeOldBackup: true,
//     keepLastDaysBackup: 1,
//     autoBackupPath: path.join(__dirname, '../../mongo_backup/backup_'), // i.e. /var/database-backup/
//     autoComressedBackupPath: path.join(__dirname, '../../mongo_backup_compressed/') // i.e. /var/database-backup/
// }; // Staging db path

// let dbOptions =  {
//     user: ' testdb',
//     pass: ' testdb@396482',
//     host: '3.228.60.157',
//     port: 27017,
//     database: ' testdb',
//     autoBackup: true, 
//     removeOldBackup: true,
//     keepLastDaysBackup: 1,
//     autoBackupPath: path.join(__dirname, '../../mongo_backup/backup_'), // i.e. /var/database-backup/
//     autoComressedBackupPath: path.join(__dirname, '../../mongo_backup_compressed/') // i.e. /var/database-backup/
// }; // AWS live db path

function stringToDate(dateString){
    return new Date(dateString);
}

/* return if variable is empty or not. */
function empty(mixedVar){
    let undef, key, i, len;
    let emptyValues = [undef, null, false, 0, '', '0'];
    for(i=0,len=emptyValues.length;i<len;i++){
        if(mixedVar === emptyValues[i]){
            return true;
        }
    }
    if(typeof mixedVar === 'object'){
        for(key in mixedVar){
            return false;
        }
        return true;
    }
    return false;
};

exports.autoBackupMongoDatabase = async ()=>{
    try {
        // check for auto backup is enabled or disabled
        // console.log('11');
        if(dbOptions.autoBackup){
            // console.log('22');
            let date = new Date();
            let beforeDate, oldBackupDir, oldCompressedBackupDir, oldBackupPath, oldCompressedBackupPath;
            // console.log(date, '------Date');
            currentDate = stringToDate(date); // Current date
            // console.log(currentDate, '------currentDate');
            let newBackupDir = (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
            let fileFolderName = 'mongodump-'+newBackupDir;
            let newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
            // check for remove old backup after keeping # of days given in configuration
            if(dbOptions.removeOldBackup){
                beforeDate = _.clone(currentDate);
                beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
                oldBackupDir = (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate() + '-' + beforeDate.getFullYear();
                oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
            }
            if(dbOptions.removeOldCompressedFile){
                beforeDate = _.clone(currentDate);
                beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
                oldCompressedBackupDir = (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate() + '-' + beforeDate.getFullYear();
                oldCompressedBackupPath = dbOptions.autoComressedBackupPath + 'mongodump-' + oldCompressedBackupDir; // old compressed backup(after keeping # of days)
            }

            // Command for local database
            let cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --out ' + newBackupPath; // Command for mongodb dump process
            
            // Command for live
            // let cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process

            exec(cmd, function (error, stdout, stderr){
                if(empty(error)){

                    console.log('Mongo backup done');

                    let compressedFileName = `${fileFolderName}`+`.zip`;

                    let newFilePath = path.join(__dirname, `../../mongo_backup/`);

                    let newFilePathCompressed = path.join(__dirname, `../../mongo_backup_compressed/`);

                    let fileCompressed = newFilePathCompressed+`${compressedFileName}`;


                    let output = fs.createWriteStream(newFilePathCompressed+`${compressedFileName}`);
                    let archive = archiver('zip', {
                        zlib: { level: 9 } // Sets the compression level.
                    });

                    archive.directory(newFilePath, false);
                    
                    output.on('close', function (){
                        console.log(archive.pointer() + ' total bytes');
                        console.log('Archiver has been finalized and the output file descriptor has closed.');
                        uploadMongoDatabase();
                    });

                    async function uploadMongoDatabase(){
                        await s3.putObject({
                            Bucket: constant.awsCredentials.s3.bucketName,
                            Key: `.park_database-backup/`+`${compressedFileName}`,
                            ACL: 'public-read',
                            Body: fs.readFileSync(fileCompressed),
                        }, function(err, data){
                            if(data){
                                console.log(data, '    res of s3 upload');

                                if(dbOptions.removeOldBackup){
                                    if(fs.existsSync(oldBackupPath)){
                                        exec("rm -rf " + oldBackupPath, function (err) { });
                                    }
                                }

                                if(dbOptions.removeOldCompressedFile){
                                    if(fs.existsSync(oldCompressedBackupPath+'.zip')){
                                        exec("rm -rf " + oldCompressedBackupPath+'.zip', function (err) { });
                                    }
                                }

                            }
                            else{
                                console.log(err, '    err in s3 upload');
                            }
                        });
                    }
                    
                    archive.on('error', function(err){
                        throw err;
                    });
                    
                    archive.pipe(output);
                
                    archive.finalize();

                    // check for remove old backup after keeping # of days given in configuration
                    // if(dbOptions.removeOldBackup){
                    //     if(fs.existsSync(oldBackupPath)){
                    //         exec("rm -rf " + oldBackupPath, function (err) { });
                    //     }
                    // }
                }
                else{
                    console.log('--',error,'55');

                    console.log('--',stdout,'66');

                    console.log('--',stderr,'77');
                }
            });
        }
    } catch (err) {
        console.log(err,'Internal server error in auto backup mongo database');
    }
}
