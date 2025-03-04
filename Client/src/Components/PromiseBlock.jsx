import PropTypes from "prop-types";

const PromiseBlock = ({ children }) => {
  return (
    <section className="w-full h-auto border border-gray-400 rounded-2xl flex gap-[20px] p-[20px] sticky top-[10vh] z-10">
      <div className="w-[80%] h-auto flex flex-col gap-[20px]">
        <h1>UA Promises</h1>
        {children}
      </div>
      <div>
        <img className="w-[50px]" src="src/assets//quality.png" alt="" />
      </div>
    </section>
  );
};

PromiseBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PromiseBlock;
