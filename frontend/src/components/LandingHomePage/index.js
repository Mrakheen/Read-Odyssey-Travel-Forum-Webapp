import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div id="about">
      <div class="row pt-5">
        <div>
          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-10">
                  <h1 id="landingHomePageLargeText">An Unique Travel Website</h1>
                  <div class="pt-3">
                    <p>Oddysey Hub is a web application made with Django (backend api) and React.js + Redux (frontend).</p>
                  </div>
                  <form className="get-access">
                    <Link to="/home">
                      <button type="submit" className="get-access-btn">Go to Oddysey Hub &nbsp;<i class="fas fa-sign-in-alt"></i></button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-5 pt-5">
              <iframe id="landingFunctionalitiesPageVideo"
                src="https://www.youtube.com/embed/8BLILMtfteE"
                title="Ribbit Promo Vid"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index;