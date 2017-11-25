import Promise from 'bluebird';
import ServiceHelper from '../service.helper';
import gridFs from '../gridfs';

export default class FileController {

    /**
     * Gets a single file from the DB.
     */
    static show(req, res, next) {
        return gridFs.findFile(req.params.fileId)
            .then((file) => readFile(file, res))
            .catch(ServiceHelper.handleError(next));
    }

    /**
     * Uploads multiple files.
     */
    static create(req, res, next) {
        let promises = [];
        let metadata = req.body;
        metadata.timestamp = new Date();

        for (let key in req.files) {
            // Upload only files with a key and a content size greater than zero
            if (req.files.hasOwnProperty(key) && req.files[key].size !== 0) {
                promises.push(gridFs.writeFile(req.files[key], metadata));
            }
        }

        Promise.all(promises)
            .then((files) => {
                return res.status(201).json(files);
            })
            .catch(ServiceHelper.handleError(next));
    }

    /**
     * Deletes a file.
     */
    static remove(req, res, next) {
        return gridFs.deleteFile(req.params.fileId)
            .then(ServiceHelper.respondWithResult(res, 204))
            .catch(ServiceHelper.handleError(next));

    }

    static readFile(file, res) {
        return gridFs.readFile(file._id)
            .then((content) => {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', 'attachment; filename=\"' + file.filename + '\"');
                return res.status(200).send({
                    filename: file.filename,
                    contentType: file.contentType,
                    content: content
                });
            });
    }

}
