import React from "react";
import "./ABTesting.css";

const ABTesting = () => {
  return (
    <section className="ab">
      <div className="ab-container">
        <div className="ab-left">
          <h1>
            Maximize revenue <br />
            with A/B testing
          </h1>
          <p>
            Learn what drives growth with remotely configurable A/B test and
            full-funnel analytics.
          </p>
          <a href="#">Learn about no-code experimentation &gt;</a>
        </div>

        <div className="ab-right">
          <div className="phone">
            <div className="phone-inner">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt=""
              />

              <div className="content">
                <h3>Unlock Premium</h3>

                <div className="check-lines">
                  <div className="check"></div>
                  <div className="line"></div>
                </div>

                <div className="check-lines">
                  <div className="check"></div>
                  <div className="line short"></div>
                </div>

                <div className="plan active">
                  <div className="radio active"></div>
                  <div className="plan-text">
                    <span>Monthly</span>
                    <div className="line"></div>
                  </div>
                </div>

                <div className="plan">
                  <div className="radio"></div>
                  <div className="plan-text">
                    <span>
                      Yearly <b>-35%</b>
                    </span>
                    <div className="line"></div>
                  </div>
                </div>

                <button>Start subscription</button>
              </div>
            </div>
          </div>

          <div className="vs">VS</div>

          <div className="phone">
            <div className="phone-inner">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                alt=""
              />

              <div className="content">
                <h3>
                  Spice up your kitchen -<br />
                  go <span className="pro">Pro</span> for benefits
                </h3>

                <div className="check-lines">
                  <div className="check"></div>
                  <div className="line"></div>
                </div>

                <div className="check-lines">
                  <div className="check"></div>
                  <div className="line short"></div>
                </div>

                <div className="check-lines">
                  <div className="check"></div>
                  <div className="line"></div>
                </div>

                <div className="lifetime">
                  <span>Lifetime membership</span>
                  <div className="line"></div>
                </div>

                <button>Start now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ABTesting;