import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import WorkGallery from "../Components/WorkGallery";

const Handymen = () => {
  const reviews = [
    {
      username: "Michael Turner",
      userImage: "https://randomuser.me/api/portraits/men/15.jpg",
      review: "Fixed my broken fence quickly. Great service!",
    },
    {
      username: "Isabella Robinson",
      userImage: "https://randomuser.me/api/portraits/women/16.jpg",
      review: "Repaired my leaky faucet. Very reliable!",
    },
    {
      username: "Emily Harris",
      userImage: "https://randomuser.me/api/portraits/women/18.jpg",
      review: "Fixed my door hinge. Fast and efficient!",
    },
    {
      username: "Daniel Thomas",
      userImage: "https://randomuser.me/api/portraits/men/19.jpg",
      review: "Repaired my deck. Excellent craftsmanship!",
    },
    {
      username: "Olivia Clark",
      userImage: "https://randomuser.me/api/portraits/women/20.jpg",
      review: "Unclogged my drain in minutes. Super helpful!",
    },
    {
      username: "David Lewis",
      userImage: "https://randomuser.me/api/portraits/men/21.jpg",
      review: "Assembled my furniture with ease. Great job!",
    },
  ];

  const faqItems = [
    {
      question: "Are your handymen verified and experienced?",
      answer:
        "Yes, all our handymen are background-checked, skilled, and experienced professionals.",
    },
    {
      question: "What are your service charges?",
      answer:
        "Pricing depends on the type of job, duration, and materials required. You’ll receive an upfront estimate before booking.",
    },
    {
      question: "Do I need to provide tools and materials?",
      answer:
        "Our handymen carry basic tools, but if specific materials are needed, we can arrange them at an additional cost.",
    },
    {
      question: "Can I schedule recurring handyman services?",
      answer:
        "Yes, you can book regular maintenance or scheduled visits for ongoing repairs and upkeep.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[250px]">
            Appliance Repairing
          </h1>
          <Review img="/star.png" review="4.7 (19k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
          <div>
            <Offer
              price="₹500"
              offer="Get Your First Repair at at ₹200"
              heading="At Home Repairing, No need to carry heavy appliances"
              page="/book/handymen"
            />
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex justify-between">
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/h1.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/h2.jpg"
            alt=""
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
        <div className="w-full md:w-1/2">
          <Marque reviews={reviews} autoplay={true} pauseOnHover={true} />
        </div>
        <div className="w-full md:w-1/2">
          <WorkGallery
            images={[
              "/h1.jpg",
              "/h2.jpg",
              "/h3.jpg",
              "/h4.jpg",
              "/h5.jpg",
              "/h6.jpg",
            ]}
          />
        </div>
      </div>

      <div className="mt-10 p-6">
        <h2 className="text-2xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <FAQ items={faqItems} />
      </div>

      <Footer />
    </>
  );
};

export default Handymen;
