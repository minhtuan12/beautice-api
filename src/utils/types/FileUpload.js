import fs from "fs";
import {extension} from "mime-types";
import path from "path";

export default class FileUpload {
    constructor({originalname, mimetype, buffer}) {
        this.originalname = originalname;
        this.mimetype = mimetype;
        this.buffer = buffer;
    }

    toJSON() {
        return {
            originalname: this.originalname,
            mimetype: this.mimetype,
            filepath: this.filepath,
        };
    }

    toString() {
        return `${this.originalname}.${extension(this.mimetype)}`;
    }

    save(...paths) {
        const fileName = `${this.originalname}.${extension(this.mimetype)}`;
        const uploadDir = path.resolve('./public') + '/uploads/images'
        fs.mkdirSync(uploadDir, {recursive: true});
        fs.writeFileSync(path.join(uploadDir, fileName), this.buffer);
        const filepath = path.posix.join(...paths, fileName);
        this.filepath = filepath;
        return filepath;
    }

    static remove(filePath) {
        filePath = path.resolve('./public') + '/uploads/' + filePath;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
