import { LuMessageSquare } from "react-icons/lu";
import "./ticketCard.css";
function CardMain({ imgSrc, title, comments, createdAt, status, priority }) {
  return (
    <div className="card_main">
      <div className="image">
        <img src={imgSrc} alt="" />
      </div>

      <div className="card_main_name">
        <h2>{title}</h2>
        <div className="card_icon">
          <i>
            <LuMessageSquare /> <span>{comments}</span>
          </i>
        </div>
      </div>
      <div className="stats">
        <p>
          Status <span>{status}</span>
        </p>
        <p>
          Created: <span>{createdAt}</span>
        </p>
      </div>
      <div className="card_button">
        <a href="" className="button_one btn">
          {priority}
        </a>
        <a href="" className="button_two btn">
          View
        </a>
      </div>
    </div>
  );
}

export default CardMain;
