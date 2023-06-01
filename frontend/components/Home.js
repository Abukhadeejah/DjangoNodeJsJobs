import React from 'react';
import Link from 'next/link';

import Pagination from 'react-js-pagination';

import JobItem from './job/JobItem';
import { useRouter } from 'next/router';

const Home = ({ data }) => {

  // Destructure the required properties from the 'data' object
  const { jobs, count, resPerPage } = data;

  const router = useRouter();

  // Extract the 'page' and 'keyword' values from the 'router.query' object
  let { page = 1, keyword } = router.query;

  // Convert the 'page' value to a number
  page = Number(page);

  // Decalre the 'queryParams' variable to store the query parameters on the URL
  let queryParams;

  // Check if the code is running on the client-side (in the browser)
  if (typeof window !== 'undefined') {

    // If running on the client-side, create a new URLSearchParams object
  // from the window location search
    queryParams = new URLSearchParams(window.location.search)
  }

  const handlePageChange = (currentPage) => {
    // Update the page query parameter and navigate to the new URL
    
    // Step 1: Checking Existing Page Parameter
    if(queryParams.has("page")) {
      // If a "page" parameter already exists in queryParams:
      // Update the value of the "page" parameter to the new currentPage
      queryParams.set("page", currentPage);

    } else {
      // If a "page" parameter doesn't exist in queryParams:
      // Append a new "page" parameter with the value of currentPage
      queryParams.append("page", currentPage)
    };

    // Step 2: Updating the URL and Navigating
    // Convert the queryParams object to a string and update the search property
    router.push({
      search: queryParams.toString(),
    });
  };  


  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          {/* <Filters />{" "} */}
        </div>

        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5">
            <h4 className="page-title">
              {keyword
              ? `${jobs.length} ${keyword} Jobs looking for you`
              : "Latest Jobs looking for You"}
            </h4>
              <Link href="/stats" legacyBehavior>
                <button className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </button>
              </Link>
            <div className="d-block">
              <Link href="/search">Go to Search</Link>
            </div>
          </div>
          {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />) }

          {resPerPage < count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination 
                activePage={page}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={handlePageChange}
                nextPageText={"Next Page"}
                prevPageText={"Previous Page"}
                firstPageText={"First Page"}
                lastPageText={"Last Page"}
                itemClass="page-item"
                linkClass="page-link"            
              />
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default Home;