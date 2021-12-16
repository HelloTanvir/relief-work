import CircleLoader from 'react-spinners/CircleLoader';

const Loader = () => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
        <CircleLoader color="#C8F051" loading size={50} />
    </div>
);

export default Loader;
