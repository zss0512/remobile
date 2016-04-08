var React = require('react');
var UI = require('UI');

var View = UI.View;
var Content = UI.Content;
var Grid = UI.Grid;
var Button = UI.Button.Button;
var Modal = UI.Modal;

function showIndicator1() {
	app.showIndicator();
  setTimeout(()=>{
      app.hideIndicator();
  }, 2000);
}

function showIndicator2() {
	app.showPreloader();
	setTimeout(()=>{
	    app.hidePreloader();
	}, 2000);
}

function showIndicator3() {
	app.showPreloader('My text...');
	setTimeout(()=>{
	    app.hidePreloader();
	}, 2000);
}

module.exports.navbar = React.createClass({
    render() {
        return (
            <View.Navbar title="Preloader" />
        )
    }
});

module.exports.page = React.createClass({
	render() {
		return (
			<View.PageContent>
				<Content.ContentBlock>
				<p>How about an activity indicator? Framework 7 has a nice one. The F7 preloader is made with SVG and animated with CSS so it can be easily resized. Two options are available: the default is for light background and another one is for dark background. The HTML is pretty easy, just add a .preloader className to any element. For the dark background option, also add a .preloader-white className. Here are some examples:</p>
				</Content.ContentBlock>

				<Content.ContentBlock row style={{textAlign:'center'}}>
				  <div className="col-25">Default:<br /><span className="preloader"></span></div>
				    <div style={{backgroundColor: '#333'}} className="col-25">White:<br /><span className="preloader preloader-white"></span></div>
				    <div className="col-25">Big:<br /><span className="preloader" style={{width: '42px', height:'42px'}}></span></div>
				    <div style={{backgroundColor: '#333'}} className="col-25">White:<br /><span className="preloader preloader-white" style={{width: '42px', height:'42px'}}></span></div>
				</Content.ContentBlock>

				<Content.ContentBlock>
				    <p>With <b>app.showIndicator()</b> you can call small overlay with indicator:</p>
				    <Button onTap={showIndicator1}>Open small indicator overlay</Button>
				    <p>With <b>app.showPreloader()</b> you can call modal window with preloader:</p>
				    <Button onTap={showIndicator2}>Open preloader modal</Button>
				    <p>With <b>app.showPreloader('My text...')</b> you can call it with custom title:</p>
				    <Button onTap={showIndicator3}>Open custom preloade</Button>
				</Content.ContentBlock>

			</View.PageContent>
		);
	}
});
