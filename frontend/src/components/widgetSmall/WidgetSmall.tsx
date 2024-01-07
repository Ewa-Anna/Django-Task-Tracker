import ContributorCard from "../contributorCard/ContributorCard";
import "./widgetSmall.css"

import { contributors } from "../../dummyData";
 function WidgetSmall() {
  return (
    <div className="bottomRightCard">
   
      <div className="bottomCard_name">
        <h2>Top Contributos</h2>
        <a href="#">View More</a>
      </div>
      <div className="bottomRightCard_content">
      {contributors &&
        contributors.map((person) => {
          return <ContributorCard key={person.id} {...person} />;
        })}
        </div>
    </div>
  );
}

export default WidgetSmall