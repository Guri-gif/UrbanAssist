import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import WorkGallery from "../Components/WorkGallery";

const Makeup = () => {
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
      question: " How do I choose the right foundation shade?",
      answer:
        " Test foundation on your jawline in natural light. The shade that blends seamlessly into your skin is the right match.",
    },
    {
      question: " What’s the difference between BB cream and foundation?",
      answer:
        "BB cream is lightweight and provides sheer coverage with skincare benefits, while foundation offers more coverage and a wider shade range.",
    },
    {
      question: "How can I make my makeup last all day?",
      answer:
        "Use a primer before applying makeup, set it with a setting powder, and finish with a setting spray.",
    },
    {
      question: " How do I prevent my lipstick from smudging?",
      answer:
        "Exfoliate and moisturize lips, apply a lip liner, fill in with lipstick, and blot with tissue before applying a second layer.",
    },
  ];
  return (
    <>
      <Navbar />

      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[250px]">Women Makeup</h1>
          <Review img="src/assets/star.png" review="4.7 (19k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
          <div>
            <Offer
              price="₹5000"
              offer="Get Your First Makeover at ₹2000"
              heading="At Home Salon Look"
            ></Offer>
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex justify-between">
          <img
            className="w-[45%] h-fit rounded-lg"
            src="src/assets/make3.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="w-[45%] h-fit rounded-lg"
            src="src/assets/make2.jpg"
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
          <WorkGallery images={[
            "src/assets/m1.jpg",
            "src/assets/m2.jpg",
            "src/assets/m3.jpg",
          ]}/>
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

export default Makeup;
