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
            <Offer
              price="₹500"
              offer="Get Your First Consultation free"
              heading="At-home consultation"
              page="/book-painter"
            ></Offer>
          </div>
        </div>
        <div className="w-[75%] h-[1000px] flex">
          <img
            className="w-[50%] h-fit"
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
          <WorkGallery
            images={[
              "https://img.freepik.com/free-photo/empty-minimal-room-interior-design-with-pastel-blue-wall_53876-145506.jpg?t=st=1742273761~exp=1742277361~hmac=75c35935b2c3a5e1df8911bd25cdff06436daa146947ab105e228e5f4c276e97&w=1380",
              "https://img.freepik.com/free-photo/sofa-living-room-with-copy-space_43614-869.jpg?t=st=1742274372~exp=1742277972~hmac=040fe17e3b7b940ea1c036dc040f9910ca618e712b543f936535a38234ba4458&w=1380",
              "https://img.freepik.com/free-photo/yellow-armchair-living-room-with-copy-space_43614-940.jpg?t=st=1742274444~exp=1742278044~hmac=f1939ab2d1a85670f81dbb2c8652aca5daffbdf0773d9096945acadc29e484c7&w=1060",
              "https://img.freepik.com/free-photo/retro-living-room-interior-design_53876-145503.jpg?t=st=1742274469~exp=1742278069~hmac=9217f6e9c9b704cb115912ccbe6148e6095a9d6364857fbca55cfdab67df28a3&w=1380",
              "https://img.freepik.com/free-photo/gray-sofa-brown-living-room-with-copy-space_43614-954.jpg?t=st=1742274344~exp=1742277944~hmac=404787f4869992de396914a878735413cecc2f20e21b122dcc8d40820e3eb498&w=1380",
              "https://img.freepik.com/free-photo/white-sideboard-living-room-interior-with-copy-space_43614-800.jpg?t=st=1742274516~exp=1742278116~hmac=2a7c3ac42856943ec06117f24c9af5952878ea737a9d366d3db992e2d72c571d&w=1380",
              "https://img.freepik.com/free-photo/view-room-interior-with-furniture-copy-space_23-2150680550.jpg?t=st=1742274558~exp=1742278158~hmac=93234ba1c97975ed6bf5e314643f2badbb3ffec974e8f8218459bcfab56f27ef&w=1060",
              "https://img.freepik.com/free-photo/wood-sideboard-green-living-room-with-copy-space_43614-916.jpg?t=st=1742274585~exp=1742278185~hmac=43794b2b58a7baa940a6f854abc9fc97287097b8814e089183c005d6aa2267a6&w=1380",
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
