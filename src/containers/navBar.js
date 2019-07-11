import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { favorite } = this.props;
    console.log('TLC: NavBar -> render -> favorite', favorite.length);

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to="/">Home</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Link to="/favorite">{favorite.length}Favorite</Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorite: state.favorite.favorite,
  };
};
export default connect(
  mapStateToProps,
  null,
)(NavBar);
