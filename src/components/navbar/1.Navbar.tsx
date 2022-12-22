/**
 * Styling
 */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

/**
 * Hooks or utility functions
 */
import usePlayer from "../../hooks/usePlayer";

const TopNavbar = () => {
  const { playerData, logOut } = usePlayer();

  return (
    <Navbar className="w-100" bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>S-Bridge</Navbar.Brand>
        <div>
          <Navbar.Collapse>
            <Nav className="me-auto">
              {playerData && (
                <NavDropdown
                  title={`${playerData.playerName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
