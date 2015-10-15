'use strict';

var fio = require('imacros-fio');
var vsprintf = require('format').vsprintf;
var formatDate = require('isolocaldateformat');

function FileTransport ( options ){
  options = options || {};

  // Transport must set groupsEnabled and groupsDisabled to provide transport
  // level support for overriding what groups to log
  // (NOTE - the user does not need to pass in groupsEnabled, but the
  // transport must set these properties)
  this.groupsEnabled = options.groupsEnabled;
  this.groupsDisabled = options.groupsDisabled;

  // Transport specific settings
  // ------------------------------
  this.logFileName = options.logFileName;
  this.delimiter = options.delimiter === undefined ? '\t' : options.delimiter;

  return this;
}

FileTransport.prototype.name = 'FileTransport';
FileTransport.prototype.log = function FileTransportLog( loggedObject ){
  // Do something with loggedObject
  //window.console.log(loggedObject);
  var delim = this.delimiter;
  var time = formatDate(new Date(loggedObject.unixTimestamp * 1000));
  var group = loggedObject.group;
  var message = time + delim + group;

  if (loggedObject.originalArgs.length > 0)
    message += delim + vsprintf(loggedObject.message, loggedObject.originalArgs);
  else {
    message += delim + loggedObject.message;
  }

  fio.append(this.logFileName, message + '\n');
  return this;
};

module.exports = FileTransport;
