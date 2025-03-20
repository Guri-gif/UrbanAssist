import Navbar from "../Components/Navbar";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import Offer from "../Components/Offer";
import Marque from "../Components/Marque";
import WorkGallery from "../Components/WorkGallery";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";

const Painting = () => {
  const reviews = [
    {
      username: "John Doe",
      userImage: "https://randomuser.me/api/portraits/men/1.jpg",
      review: "Amazing service! Would highly recommend.",
    },
    {
      username: "Jane Smith",
      userImage: "https://randomuser.me/api/portraits/women/2.jpg",
      review: "Loved the experience, will come back again!",
    },
    {
      username: "Mike Johnson",
      userImage: "https://randomuser.me/api/portraits/men/3.jpg",
      review: "Great quality and support!",
    },
  ];

  const faqItems = [
    {
      question: "What type of paint should I use for my home interior?",
      answer:
        " Latex (water-based) paint is best for walls, while oil-based paint is better for trim and durability.",
    },
    {
      question: " How do I prepare a wall before painting?",
      answer:
        "Keep lids tightly closed, store in a cool place, and add a few drops of water for acrylics if drying.",
    },
    {
      question: "How many coats of paint do I need?",
      answer:
        "Usually 2 coats for even coverage, but dark colors may need more.",
    },
    {
      question: "How do I avoid streaks when painting walls?",
      answer:
        'Use high-quality rollers, apply even pressure, and paint in "W" motions.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[150px]">
            Painting & Waterproofing
          </h1>
          <Review img="src/assets/star.png" review="4.8 (20k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
          <div>
            <Offer price="₹500"></Offer>
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex">
          <img
            className="w-[50%] h-[700px]"
            src="src/assets/painter1.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="w-[50%] h-fit"
            src="src/assets/painter2.jpg"
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
          <WorkGallery />
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

export default Painting;
