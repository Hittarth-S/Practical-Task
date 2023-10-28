/* eslint-disable jsx-a11y/img-redundant-alt */

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-sm-12">
              <h1 style={{ fontSize: '36px' }}>Discover your desired product at the best price.</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10 col-sm-12">
            <div className="banner-image">
              <img
                src={require('../assets/background-1.jpg')}
                alt="Banner Image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;