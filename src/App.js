// import { FontAwesomeIcon } from "reactstrap";

// import Post from "./components/Post";
// import Header from "./components/Header";
import Projects from "./components/Projects";
import SideNav from "./components/SideNav";

const App = () => (
  <>
    {/* <Header /> */}

    <main className="my-5 py-5">
      <div id="page-top">
        {/* <!-- Navigation--> */}
        <SideNav />
        {/* <!-- Page Content--> */}
        <div className="container-fluid p-0">
          {/* <!-- About--> */}
          <section className="resume-section" id="about">
            <div className="resume-section-content">
              <h1 className="mb-0">
                Brittany
                <span className="text-primary">Johns</span>
              </h1>
              <div className="subheading mb-5">
                Lagrange, Ohio &nbsp; · &nbsp; (440) 225-2432 &nbsp;· &nbsp;
                <a href="mailto:bhannajohns@gmail.com">bhannajohns@gmail.com</a>
              </div>
              <p className="lead mb-5">
                Tenacious, full stack software developer with an unstoppable
                desire to learn everything possible and a passion for problem
                solving. Agile to the core, over the last five years, I've moved
                around from product to product - based on the needs of the
                company. With an innate ability to learn on the fly, I'm able to
                jump to where I'm needed & welcome every opportunity.
              </p>
              <div className="social-icons">
                <a
                  className="social-icon"
                  href="https://www.linkedin.com/in/brittjohns/"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  className="social-icon"
                  href="https://github.com/brittanyjohns"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a className="social-icon" href="#!">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="social-icon" href="#!">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* <!-- Experience--> */}
          <section className="resume-section" id="experience">
            <div className="resume-section-content">
              <h2 className="mb-5">Experience</h2>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">Software Developer</h3>
                  <div className="subheading mb-3">VHT</div>
                  <p>
                    Develop, deploy & maintain multiple production applications.
                    Assisted with rearchitecting the
                    authentication/authorization platform using the Serverless
                    framework & AWS services such as Cognito, Lambda &
                    CloudFormation. Built APIs using GraphQL & DynamoDB. Backend
                    features using Node.js, Typescript & Ruby. Frontend UI work
                    using ReactJS. Implement CI workflows using CircleCI.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">June 2018 - Present</span>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">Associate Software Developer</h3>
                  <div className="subheading mb-3">VHT</div>
                  <p>
                    Worked as development support for customer escalations &
                    internal troubleshooting. Implemented feature enhancements
                    written in C++ & Erlang legacy code.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">August 2017 - June 2018</span>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">Associate Development Intern</h3>
                  <div className="subheading mb-3">VHT</div>
                  <p>
                    Developed web applications that controlled and monitored
                    client & internal test environments to create a more user
                    friendly experience. Learned & successfully used APEX to
                    implement a new Salesforce solution that enabled VHT's
                    Support Team to work more effectively.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">April 2017 - August 2017</span>
                </div>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* <!-- Education--> */}
          <section className="resume-section" id="education">
            <div className="resume-section-content">
              <h2 className="mb-5">Education</h2>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">Launch School</h3>
                  <div className="subheading mb-3">Online</div>
                  <div>Computer Programming - Web Development Track</div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">2016 - 2017</span>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="flex-grow-1">
                  <h3 className="mb-0">Lorain County Community College</h3>
                  <div className="subheading mb-3">
                    Associate of Arts - General Studies
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-primary">August 2012 - May 2015</span>
                </div>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* <!-- Skills--> */}
          <section className="resume-section" id="skills">
            <div className="resume-section-content">
              <h2 className="mb-5">Skills</h2>
              <div className="subheading mb-3">
                Programming Languages, Tools & Skills
              </div>
              <ul className="list-inline dev-icons">
                <li className="list-inline-item">
                  <i className="fa-brands fa-node-js"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-css3-alt"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-js-square"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-react"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-aws"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-yarn"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-ruby"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fab fa-npm"></i>
                </li>
              </ul>
              <hr />
              <ul className="fa-ul mb-0">
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  JavaScript/TypeScript
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  Ruby/Rails
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  CircleCI
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  AWS Services/Tools
                  <ul>
                    <li>Cognito</li>
                    <li>DynamoDB</li>
                    <li>Lambda</li>
                    <li>IAM</li>
                    <li>AppSync</li>
                    <li>CloudFormation</li>
                    <li>Event Bridge</li>
                    <li>SQS/SNS</li>
                    <li>CDK</li>
                  </ul>
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  Serverless framework
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  Graph QL
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  Agile Development & Scrum
                </li>
                <li>
                  <span className="fa-li">
                    <i className="fas fa-check"></i>
                  </span>
                  Adapting & Learning New Things
                </li>
              </ul>
            </div>
          </section>
          <hr className="m-0" />
          {/* <!-- Projects--> */}
          <section className="resume-section" id="projects">
            <div className="resume-section-content">
              <h2 className="mb-5">Projects</h2>
              <Projects />
            </div>
          </section>
        </div>
      </div>
    </main>
  </>
);

export default App;
