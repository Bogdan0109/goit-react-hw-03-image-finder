import './Loader.scss';
import { BallTriangle } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
  return (
    <h1
      style={{
        margin: '0 auto',
        fontSize: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
      Загружаем...
    </h1>
  );
};
