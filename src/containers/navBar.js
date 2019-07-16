import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, Nav, NavbarBrand, NavItem } from 'reactstrap';

const styles = {
  navBar: {
    height: '60px',
  },
};

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

    return (
      <div>
        <Navbar style={styles.navBar} fixed="top" color="light" light expand="md">
          {/* <Link to="/">FavyGiphy</Link> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Link to="/" className="mr-3">
              Home
            </Link>
            <Link to="/favorite">My Favorite {favorite.length}</Link>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorite: state.gif.favorite,
  };
};
export default connect(
  mapStateToProps,
  null,
)(NavBar);
