import PropTypes from "prop-types";

function Review({ img, review }) {
  return (
    <section className="w-full h-[30px] flex gap-[10px] items-center">
      <img className="h-full" src={img} alt="" />
      <p className="font-light">{String(review)}</p>
    </section>
  );
}

Review.propTypes = {
  img: PropTypes.string.isRequired,
  review: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Review;
