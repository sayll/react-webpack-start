import React from 'react';

function Slider(props) {
  return (
    <div >
      <button
        onClick={() => {
          console.log(1);
          return 0;
        }}
      >
        test
      </button>
      {props.name}
    </div>
  );
}

Slider.defaultProps = {
  name: 'test',
};
Slider.propTypes = {
  name: React.PropTypes.string,
};

export { Slider };
export default Slider;
