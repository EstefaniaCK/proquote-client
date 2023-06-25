import './NotFound.scss';

export default function NotFound({ message }) {
  return (
    <div className="not-found">
      <h1 className="not-found__error">4 0 4</h1>
      <p className="not-found__text">Page Not Found</p>
      {message && <p>{message}</p>}
    </div>
  );
}
