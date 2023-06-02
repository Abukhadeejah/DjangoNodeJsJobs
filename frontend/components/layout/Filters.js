import React from 'react';
import { useRouter } from 'next/router';


const Filters = () => {

  const router = useRouter();

  // Decalre the 'queryParams' variable to store the query parameters on the URL
  let queryParams;

  // Check if the code is running on the client-side (in the browser)
  if (typeof window !== 'undefined') {

    // If running on the client-side, create a new URLSearchParams object
  // from the window location search
    queryParams = new URLSearchParams(window.location.search)
  }


  function handleClick(checkbox) {
    if (typeof window !== 'undefined') {
      const checkboxes = document.getElementsByName(checkbox.name);

      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
    }

    if (checkbox.checked === false) {
      // Delete the filter from queryParams
      queryParams.delete(checkbox.name)
      router.replace({
        search: queryParams.toString()
      })
    } else {
      // set new flter value to queryParams
      queryParams.set(checkbox.name, checkbox.value);
      router.replace({
        search: queryParams.toString()
      });
    }
  
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== 'undefined') {
      const value = queryParams.get(checkBoxType);
      return checkBoxValue === value ? true : false;
    }
  }









  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandler('jobType', "Permanent")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          Permanent
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check2"
          value="Contract"
          defaultChecked={checkHandler('jobType', "Contract")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check2">
          Contract
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check3"
          value="Internship"
          defaultChecked={checkHandler('jobType', "Internship")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check3">
          Internship
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check4"
          value="Free Visa"
          defaultChecked={checkHandler('jobType', "Free Visa")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check3">
          Free Visa
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Education</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check5"
          value="Bachelors"
          defaultChecked={checkHandler('education', "Bachelors")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check4">
          Bachelors
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check6"
          value="Masters"
          defaultChecked={checkHandler('education', "Masters")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check5">
          Masters
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check7"
          value="Phd"
          defaultChecked={checkHandler('education', "Phd")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check6">
          Phd
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check8"
          value="Undergraduate"
          defaultChecked={checkHandler('education', "Undergraduate")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check6">
          Undergraduate
        </label>
      </div>

      <hr />

      <h5 className="mb-3">Experience</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="Fresher"
          defaultChecked={checkHandler('experience', "Fresher")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check7">
          Fresher
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check10"
          value="1 Year"
          defaultChecked={checkHandler('experience', "1 Year")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check8">
          1 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check11"
          value="2 Years"
          defaultChecked={checkHandler('experience', "2 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          2 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check12"
          value="3 Years"
          defaultChecked={checkHandler('experience', "3 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          3 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check13"
          value="3 Years above"
          defaultChecked={checkHandler('experience', "3 Years above")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check10">
          3 Year+
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Salary Range</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check14"
          value="1-50000"
          defaultChecked={checkHandler('salary', "1-50000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check11">
          $1 - $50000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check15"
          value="50000-100000"
          defaultChecked={checkHandler('salary', "50000-100000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check12">
          $50000 - $100,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check16"
          value="100000-200000"
          defaultChecked={checkHandler('salary', "100000-200000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check13">
          $100,000 - $200,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="defaultCheck2"
          value="300000-500000"
          defaultChecked={checkHandler('salary', "300000-500000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          $300,000 - $500,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check17"
          value="500000-1000000"
          defaultChecked={checkHandler('salary', "500000-1000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check14">
          $500,000 - $1,000,000
        </label>
      </div>

      <hr />
    </div>
  )
}

export default Filters