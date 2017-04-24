class MazeConfigControl extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      type: props.type || 'grid',
      width: props.width || 10,
      height: props.height || 10
    };
    
    this.onWidth = this.onWidth.bind(this);
    this.onHeight = this.onHeight.bind(this);
    this.onRedraw = this.onRedraw.bind(this);
  }
  
  onWidth(e) {
    this.setState({ width: e.target.value });
  }
  
  onHeight(e) {
    this.setState({ height: e.target.value });
  }

  onRedraw(e) {
    this.setState({ width: this.state.width, height: this.state.height });
  }
  
  render() {
    return (
      <div className='maze-controller'>
        <form>
          <fieldset>
            <label for="width">Width</label>
            <input type="text" placeholder="Columns" id="width" value={ this.state.width } onChange={ this.onWidth } />
            <label for="height">Height</label>
            <input type="text" placeholder="Rows" id="height" value={ this.state.height } onChange={ this.onHeight } />
            <input className="button button-outline" type="button" value="Redraw" onClick={ this.onRedraw } />
          </fieldset>
        </form>

        <MazeControl width={ this.state.width } height={ this.state.height } type={ this.state.type } />
      </div>
    );
  }
};