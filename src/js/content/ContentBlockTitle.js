var React = require('react');

module.exports = React.createClass({
    render() {
        return (
            <div className="content-block-title">
                {this.props.children}
            </div>
        );
    }
});
