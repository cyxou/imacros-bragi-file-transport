# imacros-bragi-file-transport
Log to file from iMacros' scripts using Bragi logging librarary.

## Install
```
npm install cyxou/imacros-bragi-file-transport
```

## Usage
```
var logger = require('bragi-browser');
var FileTransport = require('imacros-bragi-file-transport');

logger.transports.add(new FileTransport({ logFileName: 'fancyLogName.log' }));
```
