import CircleLoader from 'react-spinners/CircleLoader';

const Loader = () => (
    <div
        className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
        <CircleLoader color="#C8F051" loading size={50} />
    </div>
);

export default Loader;
