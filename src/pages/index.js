import { Helmet } from "react-helmet";

/* COMPONENTS */
import ActiveListings from "../components/active-listings";
import Banner from "../components/banner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>User | Website</title>
      </Helmet>

      <section className="homepage-3">
        {/* BANNER */}
        <Banner />

        {/* ACTIVE LISTINGS */}
        <ActiveListings />

      </section>
    </>
  );
};

export default Home;
