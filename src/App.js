import { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
const url = 'https://course-api.com/react-tabs-project';
function App() {
  //loading state
  const [loading, setLoading] = useState(true);
  //jobs state
  const [jobs, setJobs] = useState([]);

  //value state base on index
  const [value, setValue] = useState(0);

  //fetch handler function

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const Response = await fetch(url);
      const data = await Response.json();

      setLoading(false);
      setJobs(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  //LOADING STATE
  if (loading) {
    return (
      <section className="section_loading">
        <h1 className="section_loading_heading">LOADING...</h1>
      </section>
    );
  }

  //DESTRUTURE
  const { company, dates, duties, title } = jobs[value];

  //filter items based on order

  const filterbasedIndex = (index) => {
    setValue(index);
  };

  return (
    <section className="section">
      <div className="section_title">
        <h2>EXPERIENCE</h2>
        <div className="section_underline"></div>
      </div>
      <div className="section_jobs">
        {/** BUTTON CONTAINER*/}

        <div className="section_jobs_btn">
          {jobs.map((job, index) => {
            return (
              <button
                className={`btn ${index === value && 'active'} `}
                onClick={() => filterbasedIndex(index)}
                key={index}
              >
                {job.company}
              </button>
            );
          })}
        </div>

        {/*JOBS INFO */}
        <article className="section_jobs_info">
          <h3 className="section_jobs_title">{title}</h3>
          <h4 className="section_jobs_company">{company}</h4>
          <p className="section_jobs_date">{dates}</p>

          {duties.map((duty, index) => {
            return (
              <div key={index} className="section_jobs_description">
                <FaAngleDoubleRight
                  size={20}
                  color="#1098ad"
                ></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
