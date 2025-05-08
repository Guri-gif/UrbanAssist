import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Promise from "../Components/Promise";
import PromiseBlock from "../Components/PromiseBlock";
import Review from "../Components/Review";
import WorkGallery from "../Components/WorkGallery";

const Repairing = () => {
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
    {
      username: "Emma Brown",
      userImage: "https://randomuser.me/api/portraits/women/4.jpg",
      review: "Super helpful and friendly. 10/10!",
    },
    {
      username: "Chris Lee",
      userImage: "https://randomuser.me/api/portraits/men/5.jpg",
      review: "Fast and reliable. Very happy!",
    },
    {
      username: "Olivia Wilson",
      userImage: "https://randomuser.me/api/portraits/women/6.jpg",
      review: "A smooth experience from start to finish.",
    },
    {
      username: "David Martinez",
      userImage: "https://randomuser.me/api/portraits/men/7.jpg",
      review: "Customer support is top-notch!",
    },
  ];

  const faqItems = [
    {
      question: "What types of electric appliances do you repair?",
      answer:
        "We repair refrigerators, washing machines, microwaves, air conditioners, televisions, and more."
    },
    {
      question: "Do you offer home service for repairs?",
      answer:
        "Yes, our verified technicians provide doorstep service for convenience.",
    },
    {
      question: "How much does an appliance repair cost?",
      answer:
        "The cost depends on the appliance type, issue, and required parts. Get a free estimate before repair.",
    },
    {
      question: " Do you provide any warranty on repairs?",
      answer:
        "Yes, we offer a limited warranty on repairs and replaced parts.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="w-auto h-screen flex gap-[50px] mx-[100px] mt-[20vh] z-0">
        <div className="w-[25%] flex flex-col gap-[20px]">
          <h1 className="text-3xl font-semibold w-[250px]">Appliance Repairing</h1>
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
              page="/book/repairing"
            ></Offer>
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex justify-between">
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/e1.jpg"
            alt=""
            loading="lazy"
          />
          <img
            className="w-[45%] h-fit rounded-lg"
            src="/e2.jpg"
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
              "/e4.jpg",
              "/e5.jpg",
              "/e6.jpg",
              "/e7.jpg",
              "/e3.jpg",
              "/e8.jpg",
              "/e9.jpg",
              "/e10.jpg",
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

export default Repairing;
