/**
 * Styling
 */
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

/**
 * Hooks or utility functions
 */
import usePlayer from "../../hooks/usePlayer";

const TopNavbar = () => {
  const { playerData, logOut } = usePlayer();

  return (
    <Navbar className="w-100" bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            S-Bridge
          </Link>
        </Navbar.Brand>
        <div>
          {playerData && (
            <NavDropdown title={`${playerData.playerName}`}>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
