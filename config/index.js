var configValues = require('./config');/* Thist ajes the conifg.json file */

module.exports = {
  getDbConnectionString: function() {
    return "mongodb://" + configValues.uname + ":" + configValues.pwd + "@ds145380.mlab.com:45380/nodetodo" ;
  }
}