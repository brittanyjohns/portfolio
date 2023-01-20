import logo from "../logo.svg";

import { Container, Row, Col } from "reactstrap";

const AVATAR =
  "https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg";

const Layout = () => (
  <Container className="px-0">
    <Row
      noGutters
      className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative"
    >
      <Col
        xs={{ order: 2 }}
        md={{ size: 4, order: 1 }}
        tag="aside"
        className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0"
      ></Col>

      <Col
        xs={{ order: 1 }}
        md={{ size: 7, offset: 1 }}
        tag="section"
        className="py-5 mb-5 py-md-0 mb-md-0"
      >
        <Post />
      </Col>
    </Row>
  </Container>
);

export default Layout;
