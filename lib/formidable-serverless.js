import formidable, { IncomingForm } from "formidable";

IncomingForm.prototype.parse = function (req, cb) {
  if (cb) {
    const fields = {};
    const files = {};
    this.on("field", function (name, value) {
      fields[name] = value;
    })
      .on("file", function (name, file) {
        if (this.multiples) {
          if (files[name]) {
            if (!Array.isArray(files[name])) {
              files[name] = [files[name]];
            }
            files[name].push(file);
          } else {
            files[name] = file;
          }
        } else {
          files[name] = file;
        }
      })
      .on("error", function (err) {
        cb(err, fields, files);
      })
      .on("end", function () {
        cb(null, fields, files);
      });
  }

  const self = this;

  req.on("error", function (err) {
    self._error(err);
  });

  req.on("end", function () {
    if (self.error) {
      return;
    }
    const err = self._parser.end();
    if (err) {
      self._error(err);
    }
  });

  if (Buffer.isBuffer(req.rawBody)) {
    try {
      this.writeHeaders(req.headers);
      this.write(req.rawBody);
    } catch (err) {
      this._error(err);
    }
  } else if (Buffer.isBuffer(req.body)) {
    try {
      this.writeHeaders(req.headers);
      this.write(req.body);
    } catch (err) {
      this._error(err);
    }
  } else {
    this.pause = function () {
      try {
        req.pause();
      } catch (err) {
        if (!this.ended) {
          this._error(err);
        }
        return false;
      }
      return true;
    };

    this.resume = function () {
      try {
        req.resume();
      } catch (err) {
        if (!this.ended) {
          this._error(err);
        }
        return false;
      }
      return true;
    };

    try {
      this.writeHeaders(req.headers);
    } catch (err) {
      this._error(err);
    }

    req.on("aborted", function () {
      self.emit("aborted");
      self._error(new Error("Request aborted"));
    });

    req.on("data", function (buffer) {
      try {
        self.write(buffer);
      } catch (err) {
        self._error(err);
      }
    });
  }
  return this;
};

export default formidable;
