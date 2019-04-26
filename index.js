var defaultOptions = { prefix: '~' };

module.exports = function createImportIgnorePrefixPlugin({ prefix } = defaultOptions) {
  return {
    install: function (less, pluginManager) {
      var FileManager = less.FileManager;
  
      function IgnorePrefixFileManager(options) {
        this.options = options;
      }
  
      IgnorePrefixFileManager.prototype = new FileManager();
  
      IgnorePrefixFileManager.prototype.constructor = IgnorePrefixFileManager;
  
      IgnorePrefixFileManager.prototype.supports = function (filename) {
        const prefixRegex = new RegExp(`^${this.options.prefix}`, 'i');
  
        return filename.match(prefixRegex);
      };
  
      IgnorePrefixFileManager.prototype.supportsSync = IgnorePrefixFileManager.prototype.supports;
  
      IgnorePrefixFileManager.prototype.resolve = function (filename) {
        return filename.replace(this.options.prefix, '');
      }
  
      IgnorePrefixFileManager.prototype.loadFile = function (filename, currentDirectory, options, environment) {
        filename = this.resolve(filename, currentDirectory);
  
        return FileManager.prototype.loadFile.call(this, filename, currentDirectory, options, environment)
      }
  
      IgnorePrefixFileManager.prototype.loadFileSync = function (filename, currentDirectory, options, environment) {
        filename = this.resolve(filename, currentDirectory);
  
        return FileManager.prototype.loadFileSync.call(this, filename, currentDirectory, options, environment);
      }
  
      pluginManager.addFileManager(new IgnorePrefixFileManager({ prefix }))
    }
  };
}