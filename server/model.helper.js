import Promise from "bluebird";
import {errMessage, errType} from "./error";
import {config} from "./config";

export default class ModelHelper {

    static clear(model) {
        return (query) => {
            return (query ? model.find(query) : model.remove({})).exec().then((docs) => {
                let removePromises = [];
                if (docs instanceof Array) {
                    docs.map((doc) => {
                        return doc.remove();
                    });
                }
                if (model.hasOwnProperty('VersionedModel')) {
                    removePromises.push(model.VersionedModel.find({}).remove());
                }
                return Promise.all(removePromises);
            });
        };
    }

}

ModelHelper.imageFormatValidator = {
    validator: function (_id, next) {
        if (_id === null) {
            return next(true);
        } else {
            return gridFs.findFile(_id)
                .then((file) => {
                    if (file && file.metadata.mime.split('/')[0] === 'image') {
                        let ext = file.metadata.mime.split('/')[1];
                        return next(ext === 'jpeg' || ext === 'jpg' || ext === 'png' || ext === 'gif' ||
                            ext === 'webp' || ext === 'tif' || ext === 'svg');
                    } else {
                        return next(false);
                    }
                })
                .catch(() => {
                    return next(true); // no file -> no validation problem
                });
        }
    },
    message: errMessage.image.format.incorrect,
    type: errType.incorrect
};

ModelHelper.imageSizeValidator = {
    validator: function (_id, next) {
        if (_id === null) {
            return next(true);
        } else {
            return gridFs.findFile(_id)
                .then((file) => {
                    return next(file.length <= config.maxFileSize * 1000000);
                })
                .catch(() => {
                    return next(true); // no file -> no validation problem
                });
        }
    },
    message: errMessage.image.length,
    type: errType.length,
    maxSize: config.maxFileSize
};