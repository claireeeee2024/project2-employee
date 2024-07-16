import { Nav, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import "./sidebar.css";

const Sidebar = ({ navStructure }) => {
  const dispatch = useDispatch();
  const handleClick = (label) => {
    if (label === "Logout") {
      dispatch(logout());
    }
  };
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 ">
      <Nav className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start p-2 fw-medium">
        {navStructure.map((item, index) => (
          <Nav.Item key={index} className="nav-item">
            {item.subItems ? (
              <>
                <div className="d-none d-md-block no-margin-padding">
                  <Nav.Link
                    href={item.link}
                    onClick={() => handleClick(item.label)}
                    className="align-middle px-0 text-dark"
                  >
                    <i className={`fs-4 ${item.icon} me-2`}></i>
                    <span className="ms-1 d-none d-sm-inline">
                      {item.label}
                    </span>
                  </Nav.Link>
                </div>

                <Nav className="flex-column ms-4 d-none d-md-block">
                  {item.subItems.map((subItem, subIndex) => (
                    <Nav.Item key={subIndex} className="w-100">
                      <Nav.Link href={subItem.link} className=" text-dark">
                        <span className="d-none d-sm-inline">
                          {subItem.label}
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Dropdown className="d-block d-md-none">
                  <Dropdown.Toggle
                    variant="link"
                    className="nav-link align-middle px-0 text-dark no-caret"
                    id={`dropdown-${index}`}
                  >
                    <i className={`fs-4 ${item.icon} me-2`}></i>
                    <span className="ms-1 d-none d-sm-inline">
                      {item.label}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.subItems.map((subItem, subIndex) => (
                      <Dropdown.Item
                        key={subIndex}
                        href={subItem.link}
                        className="text-dark"
                      >
                        {subItem.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link
                href={item.link}
                onClick={() => handleClick(item.label)}
                className="align-middle px-0 text-dark"
              >
                <i className={`fs-4 ${item.icon} me-2`}></i>
                <span className="ms-1 d-none d-sm-inline">{item.label}</span>
              </Nav.Link>
            )}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
