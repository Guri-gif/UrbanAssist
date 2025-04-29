import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import WorkGallery from "../Components/WorkGallery";
// import c1 from '../assets/'

const Cleaning = () => {
  const reviews = [
    {
      username: "James Anderson",
      userImage: "https://randomuser.me/api/portraits/men/10.jpg",
      review:
        "Had my shelves installed quickly. Very skilled and trustworthy handyman.",
    },
    {
      username: "Linda Garcia",
      userImage: "https://randomuser.me/api/portraits/women/11.jpg",
      review: "Repaired my leaky roof. Very prompt and did an excellent job!",
    },
    {
      username: "Ethan Walker",
      userImage: "https://randomuser.me/api/portraits/men/12.jpg",
      review:
        "Fixed my broken fence without any hassle. Affordable and reliable.",
    },
    {
      username: "Rachel Martinez",
      userImage: "https://randomuser.me/api/portraits/women/13.jpg",
      review:
        "Awesome handyman! Helped with a range of issues, from plumbing to furniture assembly.",
    },
    {
      username: "David King",
      userImage: "https://randomuser.me/api/portraits/men/14.jpg",
      review:
        "Excellent service! They installed my kitchen sink perfectly and cleaned up after themselves.",
    },
  ];

  const faqItems = [
    {
      question: "What cleaning services do you offer?",
      answer:
        "We offer deep cleaning, regular cleaning, move-in/move-out cleaning, and more.",
    },
    {
      question: "Are the cleaners insured?",
      answer:
        "Yes, all our cleaning professionals are insured for your peace of mind.",
    },
    {
      question: "How much does cleaning service cost?",
      answer:
        "The cost depends on the size of the space and the type of cleaning. You can get a free quote beforehand.",
    },
    {
      question: "Do I need to provide cleaning supplies?",
      answer: "No, our team brings all necessary supplies for cleaning.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[250px]">Home Cleaning</h1>
          <Review img='/pu' review="4.8 (15k reviews)" />
          <PromiseBlock>
            <Promise text="Experienced Cleaners" />
            <Promise text="Affordable Rates" />
            <Promise text="Eco-friendly Products" />
          </PromiseBlock>
          <div>
            <Offer
              price="₹300"
              offer="Get Your First Cleaning at ₹150"
              heading="Home Cleaning, No Mess Left Behind"
              page="/book/cleaning"
            />
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex justify-between">
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/c1.jpg"
            alt="Home Cleaning"
            loading="lazy"
          />
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/c2.jpg"
            alt="Cleaned Living Room"
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
              "/c3.jpg",
              "/c4.jpg",
              "/c5.jpg",
              "/c6.jpg",
              "/c7.jpg",
              "/c8.jpg",
              "/c9.jpg",
              "/c10.jpg",
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

export default Cleaning;
