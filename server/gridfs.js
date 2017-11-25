import Grid from 'gridfs-stream';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import NotFoundError from './error/notFound';
import NotAcceptableError from './error/notAcceptable';
import fileType from 'file-type';
import config from './config';

class GridFS {

    init(mongoose) {
        this.db = mongoose.connection.db;
        this.grid = new Grid(this.db, mongoose.mongo);
    }

    /**
     * Finds a file in the database.
     */
    findFile(id) {
        return new Promise((resolve, reject) => {
            this.grid.findOne({_id: id}, (err, file) => {
                if (err) {
                    return reject(err);
                } else if (!file) {
                    return reject(new NotFoundError('File not found'));
                } else {
                    return resolve(file);
                }

            });
        });
    }

    /**
     * Reads a file from the database into a write stream.
     */
    readFile(id) {
        return new Promise((resolve, reject) => {

            const buffers = [];

            let readStream = this.grid.createReadStream({
                _id: id
            });

            readStream.on('end', () => {
                return resolve(Buffer.concat(buffers).toString('base64'));
            });

            readStream.on('error', (err) => {
                return reject(err);
            });

            readStream.on('data', (chunk) => {
                buffers.push(chunk);
            });

        });
    }

    /**
     * Writes a file into the database.
     */
    writeFile(file, metadata) {
        metadata = metadata || {};
        return new Promise((resolve, reject) => {
            let id = new mongoose.Types.ObjectId();

            if (file.name && file.name.length > config.maxLengthOfImageName) {
                return reject(new NotAcceptableError('Maximum length of file name exceeded.'));
            }
            if (file && file.length > config.maxFileSize * 1000000) {
                return reject(new NotAcceptableError('Maximum file size exceeded.'));
            }

            if (fileType(file.data)) {
                metadata.mime = fileType(file.data).mime;
            } else {
                metadata.mime = file.mimetype;
            }

            const mimeTypeBlacklist = []; // Currently, no blacklist!

            if (mimeTypeBlacklist.indexOf(metadata.mime) !== -1) {
                return reject(new NotAcceptableError('Unaccepted file format.'));
            }

            metadata.active = true;

            let writeStream = this.grid.createWriteStream({
                _id: id,
                filename: file.name,
                mode: 'w',
                metadata: metadata
            });

            writeStream.on('error', (err) => {
                return reject(err);
            });

            writeStream.on('finish', () => {
                console.log('File uploaded: ' + file.name + file.mimetype);
                return resolve({
                    id: id,
                    filename: file.name,
                    contentType: file.mimetype,
                    content: file.data.toString('base64')
                });
            });

            writeStream.write(file.data);

            writeStream.end();
        });
    }

    /**
     * Deletes the specified file.
     */
    deleteFile(id) {
        return new Promise((resolve, reject) => {
            this.grid.remove({_id: id}, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            });
        });
    }

    /**
     * Deletes all files
     */
    deleteAll() {
        let database = this.db;
        return new Promise((resolve) => {

            //dropCollection always throws an error, in this case for our seed, we ignore that error
            database.dropCollection('fs.files', () => {
                database.dropCollection('fs.chunks', () => {
                    return resolve(null);
                });
            });
        });
    }
}

export default(new GridFS());