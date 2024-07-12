import { Nav } from "react-bootstrap";

const Sidebar = ({ navStructure }) => {
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 ">
      <Nav className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start p-2 fw-medium">
        {navStructure.map((item, index) => (
          <Nav.Item key={index} className="nav-item">
            <Nav.Link href={item.link} className="align-middle px-0 text-dark">
              <i className={`fs-4 ${item.icon} me-2`}></i>
              <span className="ms-1 d-none d-sm-inline">{item.label}</span>
            </Nav.Link>
            {item.subItems && (
              <Nav className="flex-column ms-4 ">
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
            )}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
