/* BlobBuilder.js
 * A complete BlobBuilder shim
 * By Eli Grey
 * License: MIT/X11
 */

self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || function(view) {

  let
    get_class = function(object) {
      return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
    FakeBlobBuilder = view.BlobBuilder = function() {},
    FakeBlob = view.Blob = function(data, type) {
      this.data = data;
      this.size = data.length;
      this.type = type;
    },
    FBB_proto = FakeBlobBuilder.prototype = [],
    FB_proto = FakeBlob.prototype,
    FileReaderSync = view.FileReaderSync,
    FileException = function(type) {
      this.code = this[this.name = type];
    },
    file_ex_codes = (
      'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR ' +
      'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'
    ).split(' '),
    file_ex_code = file_ex_codes.length,
    URL = view.URL = view.URL || view.webkitURL || view,
    real_create_object_url,
    real_revoke_object_url,
    btoa = view.btoa,
    ArrayBuffer = view.ArrayBuffer,
    can_apply_typed_arrays = false,
    can_apply_typed_arrays_test = function(pass) {
      can_apply_typed_arrays = !pass;
    };
  while (file_ex_code--) {
    FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
  }
  try {
    if (ArrayBuffer) {
      can_apply_typed_arrays_test.apply(0, new Uint8Array(1));
    }
  } catch (ex) {}
  if (!URL.createObjectURL) {
    URL = {};
  }
  real_create_object_url = URL.createObjectURL;
  real_revoke_object_url = URL.revokeObjectURL;
  URL.createObjectURL = function(blob) {
    let type = blob.type;
    if (type === null) {
      type = 'application/octet-stream';
    }
    if (blob instanceof FakeBlob) {
      if (btoa) {
        return 'data:' + type + ';base64,' + btoa(blob.data);
      }
      return 'data:' + type + ',' + encodeURIComponent(blob.data);

    } else if (real_create_object_url) {
      return real_create_object_url.call(URL, blob);
    }
  };
  URL.revokeObjectURL = function(object_url) {
    if (object_url.substring(0, 5) !== 'data:' && real_revoke_object_url) {
      real_revoke_object_url.call(URL, object_url);
    }
  };
  FBB_proto.append = function(data /* , endings*/) {
    const bb = this;
    // decode data to a binary string
    if (ArrayBuffer && data instanceof ArrayBuffer) {
      if (can_apply_typed_arrays) {
        bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
      } else {
        let
          str = '',
          buf = new Uint8Array(data),
          i = 0,
          buf_len = buf.length;
        for (; i < buf_len; i++) {
          str += String.fromCharCode(buf[i]);
        }
      }
    } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
      if (FileReaderSync) {
        const fr = new FileReaderSync();
        bb.push(fr.readAsBinaryString(data));
      } else {
        // async FileReader won't work as BlobBuilder is sync
        throw new FileException('NOT_READABLE_ERR');
      }
    } else if (data instanceof FakeBlob) {
      bb.push(data.data);
    } else {
      if (typeof data !== 'string') {
        data += ''; // convert unsupported types to strings
      }
      // decode UTF-16 to binary string
      bb.push(unescape(encodeURIComponent(data)));
    }
  };
  FBB_proto.getBlob = function(type) {
    if (!arguments.length) {
      type = null;
    }
    return new FakeBlob(this.join(''), type);
  };
  FBB_proto.toString = function() {
    return '[object BlobBuilder]';
  };
  FB_proto.slice = function(start, end, type) {
    const args = arguments.length;
    if (args < 3) {
      type = null;
    }
    return new FakeBlob(
      this.data.slice(start, args > 1 ? end : this.data.length), type
    );
  };
  FB_proto.toString = function() {
    return '[object Blob]';
  };
  return FakeBlobBuilder;
}(self);
