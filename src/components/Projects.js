import portfolio from "../assets/img/portfolio-website.png";

const Projects = () => (
  <div className="project-wrapper">
    <h3 className="text-muted">Under Construction</h3>
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6">
          <div className="project" aria-hidden="true">
            <div className="project-body">
              <img className="project-img" src={portfolio} alt="..." />
              <p className="project-text">
                This website was developed using ReactJS & is hosted in an AWS
                S3 bucket as a static site. <br />
                To make development/deployment easier, I created a script that
                builds & copies to the existing bucket.
              </p>
              <a
                href="https://github.com/brittanyjohns/portfolio"
                tabIndex="-1"
                className="btn btn-primary col-6"
              >
                <i className="fa fa-github"></i> View source code
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="project" aria-hidden="true">
            <div className="project-body">
              <i className="fa fa-person-digging fa-10x project-icon"></i>
              <p className="project-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="project" aria-hidden="true">
            <div className="project-body">
              <i className="fa fa-screwdriver-wrench fa-10x project-icon"></i>
              <p className="project-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="project" aria-hidden="true">
            <div className="project-body">
              <i className="fa fa-toolbox fa-10x project-icon"></i>
              <p className="project-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Projects;
