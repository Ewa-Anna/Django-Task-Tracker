import "./dashboard.css";
import TicketCard from "../../ticketCard/TicketCard";
import StatsSection from "../../statsSection/StatsSection";
import card_one from "../../../img/card1.jpg";
import card_two from "../../../img/card2.jpg";
import card_three from "../../../img/card3.jpg";
import card_four from "../../../img/card4.jpg";
import question from "../../../img/Question.jpg";
import error from "../../../img/error.jpg";
import card_six from "../../../img/card6.jpg";
import WidgetSmall from "../../widgetSmall/WidgetSmall";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left">
        <div className="stats-container"></div>
        <div className="cards">
          <div className="filters">
            <div className="popular">
              <h2>Reports</h2>
              <a href="#" className="button_two">
                Popular
              </a>
            </div>
            <div className="filter_buttons">
              <a href="#" className="button_two">
                All
              </a>
              <a href="#" className="button_two">
                Bugs
              </a>
              <a href="#" className="button_two">
                Questions
              </a>
              <a href="#" className="button_two">
                Enhancments
              </a>
            </div>
          </div>

          <main>
            <TicketCard
              imgSrc={card_one}
              title={"Cubic Thunder"}
              comments={"62"}
              createdAt={"06/01/2024"}
              status={"Open"}
              priority={"Medium"}
            />
            <TicketCard
              imgSrc={card_one }
              title={"Pokemon Ball"}
              comments={"46"}
              createdAt={"06/01/2024"}
              status={"Open"}
              priority={"High"}
            />
            <TicketCard
              imgSrc={card_one }
              title={"Pyramid God"}
              comments={"22"}
              createdAt={"06/01/2024"}
              status={"Closed"}
              priority={"Low"}
            />
            <TicketCard
              imgSrc={error}
              title={"Stunning Cube"}
              comments={"77"}
              createdAt={"06/01/2024"}
              status={"Pending"}
              priority={"High"}
            />
            <TicketCard
              imgSrc={question}
              title={"Star Crystal"}
              comments={"37"}
              createdAt={"06/01/2024"}
              status={"Closed"}
              priority={"Low"}
            />
            <TicketCard
              imgSrc={error}
              title={"Crystal Bird"}
              comments={"19"}
              createdAt={"06/01/2024"}
              status={"Pending"}
              priority={"Medium"}
            />
            <TicketCard
              imgSrc={card_four}
              title={"Stunning Cube"}
              comments={"77"}
              createdAt={"06/01/2024"}
              status={"Open"}
              priority={"Low"}
            />
            <TicketCard
              imgSrc={card_one}
              title={"Cubic Thunder"}
              comments={"62"}
              createdAt={"06/01/2024"}
              status={"Open"}
              priority={"Low"}
            />
          </main>
        </div>
      </div>
      <div className="right">
        <StatsSection/>
        <WidgetSmall/>
      </div>
    </div>
  );
};

export default Dashboard;
