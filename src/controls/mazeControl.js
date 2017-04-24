class MazeControl extends React.Component {
  constructor(props) {
    super(props);

    MazeManager.initialize(props.width, props.height);
    
    this.state = {
      grid: props.type && this.props.type.toLowerCase() === 'ascii' ? MazeManager.toString() : this.gridElements(),
      width: props.width,
      height: props.height,
      context: props.context,
      log: ''
    };
    
    // Listen for log events from the context.
    this.state.context.listen(this, this.onLog);

    this.redraw = this.redraw.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onLog = this.onLog.bind(this);
  }

  onClick(e) {
    this.state.context.add('Hello!');
  }

  onLog(component, log) {
    component.setState({ log: log });
  }

  ascii() {
    this.setState({ grid: MazeManager.toString() });
  }
  
  grid() {
    this.setState({ grid: this.gridElements() });
  }

  gridElements() {
    var elements = [];
    
    // Top border.
    for (var i=0; i<=MazeManager.grid[0].length * 2; i++) {
      elements.push(<div className='cell closed'></div>);
    }
    
    elements.push(<div className='clear'></div>);
    
    // Main grid.
    for (var y=0; y<MazeManager.grid.length; y++) {
      var passageRow = [];
      
      // Left border column.
      elements.push(<div className='cell closed'></div>);
      passageRow.push(<div className='cell closed'></div>);
    
      // Rooms. Note, we only need to check south and east (because north and west have borders already included).
      for (var x=0; x<MazeManager.grid[0].length; x++) {
        // Add a cell for the room.
        elements.push(<div className='cell open'></div>);
        
        if ((MazeManager.grid[y][x] & MazeManager.DIRECTION.BOTTOM) === MazeManager.DIRECTION.BOTTOM) {
          // Open a passage to the south.
          passageRow.push(<div className='cell open'></div>);
        }
        else {
          // Close a passage to the south.
          passageRow.push(<div className='cell closed'></div>);
        }

        // Add closed passage to next row between rooms.
        passageRow.push(<div className='cell closed'></div>);
        
        if ((MazeManager.grid[y][x] & MazeManager.DIRECTION.RIGHT) === MazeManager.DIRECTION.RIGHT) {
          // Open a passage to the east.
          elements.push(<div className='cell open'></div>);
        }
        else {
          // Close a passage to the east.
          elements.push(<div className='cell closed'></div>);
        }
      }
    
      elements.push(<div className='clear'></div>);
      passageRow.push(<div className='clear'></div>);
      
      // Append passages row to elements.
      elements.push.apply(elements, passageRow);
    }
    
    return elements;
  }
  
  redraw(event) {
    MazeManager.initialize(this.state.width, this.state.height);

    if (this.props.type && this.props.type.toLowerCase() === 'ascii') {
      this.ascii();
    }
    else {
      this.grid();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    // Update maze when width or height property changes.
    this.setState({ width: nextProps.width, height: nextProps.height }, function() {
      this.redraw();
    });
  }
  
  render() {
    return (
      <div className='maze'>
        <div id='log2' className='well'>
          { this.state.log }
        </div>
        <div className={ (this.props.type && this.props.type.toLowerCase() === 'ascii' ? 'pre' : '') } onClick={this.onClick}>
          { this.state.grid }
        </div>
      </div>
    );
  }  
};