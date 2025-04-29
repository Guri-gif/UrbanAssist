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
      username: "Isabella Robinson",
      userImage: "https://randomuser.me/api/portraits/women/16.jpg",
      review:
        "Fantastic work on my office walls. Professional, tidy, and high-quality finish.",
    },
    {
      username: "John Carter",
      userImage: "https://randomuser.me/api/portraits/men/17.jpg",
      review:
        "Fast and affordable! They painted my entire living room, and it looks amazing!",
    },
    {
      username: "Emily Harris",
      userImage: "https://randomuser.me/api/portraits/women/18.jpg",
      review:
        "Exceeded my expectations. Very neat and the results were exactly what I hoped for!",
    },
    {
      username: "Daniel Thomas",
      userImage: "https://randomuser.me/api/portraits/men/19.jpg",
      review:
        "Incredible attention to detail. My exterior looks fresh and vibrant again.",
    },
    {
      username: "Olivia Clark",
      userImage: "https://randomuser.me/api/portraits/women/20.jpg",
      review:
        "They did a fantastic job painting my kitchen. Very professional and efficient!",
    },
    {
      username: "David Lewis",
      userImage: "https://randomuser.me/api/portraits/men/21.jpg",
      review:
        "Highly recommend for any painting job. The team was punctual and the finish was flawless.",
    },
  ];

  const faqItems = [
    {
      question: "What type of paint should I use for my home interior?",
      answer:
        "Latex (water-based) paint is best for walls, while oil-based paint is better for trim and durability.",
    },
    {
      question: "How do I prepare a wall before painting?",
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
          <Review img="/star.png" review="4.8 (20k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
          <div>
            <Offer
              price="₹500"
              offer="Get Your First Consultation free"
              heading="At-home consultation"
              page="/book/painter"
            />
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex">
          <img className="w-[50%] h-fit" src="/painter1.jpg" alt="" />
          <img className="w-[50%] h-fit" src="/painter2.jpg" alt="" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
        <div className="w-full md:w-1/2">
          <Marque reviews={reviews} autoplay={true} pauseOnHover={true} />
        </div>
        <div className="w-full md:w-1/2">
          <WorkGallery
            images={[
              "/paint1.jpg",
              "/paint2.jpg",
              "/paint3.jpg",
              "/paint4.jpg",
              "/paint5.jpg",
              "/paint6.jpg",
              "/paint7.jpg",
              "/paint8.jpg",
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

export default Painting;
