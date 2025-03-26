import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import WorkGallery from "../Components/WorkGallery";

const Grooming = () => {
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
      question: "What barber services are available on UrbanAssist?",
      answer:
        "UrbanAssist offers a range of barber services, including haircuts, beard trims, shaves, and hair coloring.",
    },
    {
      question: "Do I need an appointment, or do you accept walk-ins?",
      answer:
        "We welcome walk-ins, but appointments are recommended for faster service.",
    },
    {
      question: "Can I request a specific barber?",
      answer:
        "Of course! If your preferred barber is available, we’ll gladly arrange it.",
    },
    {
      question: " Can I get a consultation before my haircut?",
      answer:
        "Absolutely! Our barbers are happy to discuss styles that suit you best.",
    },
  ];
  return (
    <>
      <Navbar />

      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[250px]">
            Men&#39;s Grooming
          </h1>
          <Review img="src/assets/star.png" review="4.5 (10k reviews)" />
          <PromiseBlock>
            <Promise text="Verified Professionals" />
            <Promise text="Hassle Free Booking" />
            <Promise text="Transparent Pricing" />
          </PromiseBlock>
          <div>
            <Offer
              price="₹500"
              offer="Get Your First Makeover at ₹200"
              heading="At Home Salon Look"
            ></Offer>
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex justify-between">
          <img
            className="w-[45%] h-fit rounded-lg"
            src="src/assets/barb1.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="w-[45%] h-fit rounded-lg"
            src="src/assets/barb2.jpg"
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
              "src/assets/barb1.jpg",
              "src/assets/barb2.jpg",
              "src/assets/barb3.jpg",
              "src/assets/barb4.jpg",
              "src/assets/barb5.jpg",
              "src/assets/barb6.jpg",
              "src/assets/barb7.jpg",
              "src/assets/barb8.jpg",
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

export default Grooming;
