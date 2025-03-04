import PropTypes from "prop-types";

const Review = ({img, review}) => {
  return (
    <section className="w-full h-[30px] flex gap-[10px] items-center">
      <img className="h-full" src={img} alt="" />
      <p className="font-light">{String(review)}</p>
    </section>
  );
};

Review.propTypes = {
  img: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default Review;


