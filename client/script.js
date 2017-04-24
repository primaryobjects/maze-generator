var LogManager = {
  log: '',
  listeners: [],

  add: function(message) {
    this.log += message + '\n';
    $('#log').text(this.log);

    // Notify listener of log change.
    this.listeners.forEach(function(listener) {
      listener.callback(listener.parent, LogManager.log);
    });
  },

  listen: function(parent, callback) {
    this.listeners.push({ parent: parent, callback: callback });
  }
};

$(function() {
  ReactDOM.render(React.createElement(MazeControl, { width: 20, height: 20, context: LogManager }),
    document.getElementById('root')
  );  
});
