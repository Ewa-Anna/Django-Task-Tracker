 function ContributorCard({ ...props }) {
    const { id, firstName, lastName, userAvatar,role } = props;
  
    return (
      <div key={id} className="topSeller">
        <div className="topSellerImg">
          <img src={userAvatar} alt="" />
        </div>
        <p className="topSeller_name">
          {firstName} <span>{lastName}</span>
        </p>
    
        <a href="#" className="button_one btn">
          Follow
        </a>
      </div>
    );
  }
  export default ContributorCard